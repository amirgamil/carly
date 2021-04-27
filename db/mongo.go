package db

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/amirgamil/carly/schema"
	"github.com/amirgamil/carly/security"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Session *mongo.Client
var letters *mongo.Collection
var ctx context.Context

func initSession(user string, pass string, ip string) {
	// load .env file
	//"mongodb://%s:%s@%s:27017"
	URIfmt := "mongodb://%s:%s@%s" //"mongodb://127.0.0.1:27017" eventually add user and password
	fmt.Println(ip)
	mongoURI := fmt.Sprintf(URIfmt, user, pass, ip)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	Client, err := mongo.Connect(ctx, options.Client().ApplyURI(
		mongoURI,
	))
	if err != nil {
		log.Println("Error starting Mongo session, ", err)
	}

	models := []mongo.IndexModel{
		{
			Keys:    bson.D{{"hash", 1}},
			Options: options.Index().SetUnique(true),
		},
		{
			Keys:    bson.D{{"expiry", 1}},
			Options: options.Index().SetExpireAfterSeconds(0),
		},
	}
	letters = Client.Database("main").Collection("letters")
	fmt.Println("Established connection to %s", letters)

	// Specify the MaxTime option to limit the amount of time the operation can run on the server
	opts := options.CreateIndexes().SetMaxTime(2 * time.Second)
	_, errIn := letters.Indexes().CreateMany(ctx, models, opts)
	if errIn != nil {
		log.Println(errIn)
	}

}

func insert(new schema.Letter) (*mongo.InsertOneResult, error) {
	return letters.InsertOne(context.Background(), new)
}

var UnauthorizedUser = errors.New("password is wrong or not provided")

//look up hash string in the database
//returns a letter if found, if it's password protected (so will need to handle), and an error
func fetch(hash string, password string) (schema.JSONLetter, error) {
	//create BSON object of hash string to look for in the database
	lookFor := bson.M{"hash": hash}

	var result schema.Letter
	_ = letters.FindOne(ctx, lookFor).Decode(&result)
	jsonResult := schema.JSONLetter{
		Hash:   result.Hash,
		Title:  result.Title,
		Expiry: result.Expiry.String(),
	}
	if result.Password != "" {
		isValid := security.VerifyPassword(result.Password, password)
		if !isValid {
			return schema.JSONLetter{}, UnauthorizedUser
		}
		//get the key from the Salt in order to decrpt the message
		key, _, err := security.DeriveKey(password, result.Salt)
		if err != nil {
			log.Println("Error calculating key to decrypt the message ", err)
		}

		//decrypt the message and only return what is necessary (if no password, dont' care about Salt)
		decryptedMessage, err := security.Decrypt(string(key), result.Data)
		if err != nil {
			log.Println("Error decrypting the message, ", err)
		}
		jsonResult.Data = decryptedMessage
	} else {
		var actualData []schema.LetterData
		errD := json.Unmarshal([]byte(result.Data), &actualData)
		if errD != nil {
			log.Println("Error converting decrypted data back to readable format ", errD)
		}
		jsonResult.Data = actualData
	}
	return jsonResult, nil
}
