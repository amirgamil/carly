package db

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/amirgamil/carly/schema"
	"github.com/amirgamil/carly/security"
	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

var Session *mgo.Session
var letters *mgo.Collection

func initSession(user string, pass string, ip string) {
	// load .env file
	URIfmt := "mongodb://127.0.0.1:27017" //eventually add user and password

	//potentially update with DialInfo if needed
	Session, err := mgo.Dial(URIfmt)
	if err != nil {
		fmt.Println("Error starting Mongo session")
	}

	uniqueHash := mgo.Index{
		Key:    []string{"hash"},
		Unique: true,
	}

	sessionTTL := mgo.Index{
		Key:         []string{"expiry"},
		ExpireAfter: 0,
	}

	//create index with hash ready to put new elements in
	//establishes connection to letters database only if unique key
	//creates TTL so that mongodb automatically deletes entries past expiration date
	_ = Session.DB("main").C("letters").EnsureIndex(uniqueHash)
	_ = Session.DB("main").C("letters").EnsureIndex(sessionTTL)

	letters = Session.DB("main").C("letters")
	fmt.Println("Established connection to %s", letters)
}

func insert(new schema.Letter) error {
	return letters.Insert(new)
}

var UnauthorizedUser = errors.New("password is wrong or not provided")

//look up hash string in the database
//returns a letter if found, if it's password protected (so will need to handle), and an error
func fetch(hash string, password string) (schema.JSONLetter, error) {
	//create BSON object of hash string to look for in the database
	lookFor := bson.M{"hash": hash}

	var result schema.Letter
	err := letters.Find(lookFor).One(&result)
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
			fmt.Println("Error calculating key to decrypt the message ", err)
			panic(err)
		}

		//decrypt the message and only return what is necessary (if no password, dont' care about Salt)
		decryptedMessage, err := security.Decrypt(string(key), result.Data)
		if err != nil {
			fmt.Println("Error decrypting the message, ", err)
			panic(err)
		}
		jsonResult.Data = decryptedMessage
	} else {
		var actualData []schema.LetterData
		errD := json.Unmarshal([]byte(result.Data), &actualData)
		if errD != nil {
			fmt.Println("Error converting decrypted data back to readable format ", errD)
		}
		jsonResult.Data = actualData
	}
	return jsonResult, err
}
