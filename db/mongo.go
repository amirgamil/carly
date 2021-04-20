package db

import (
	"errors"
	"fmt"

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

func insert(new Letter) error {
	return letters.Insert(new)
}

var UnauthorizedUser = errors.New("password is wrong or not provided")

//look up hash string in the database
//returns a letter if found, if it's password protected (so will need to handle), and an error
func fetch(hash string, password string) (Letter, error) {
	//create BSON object of hash string to look for in the database
	lookFor := bson.M{"hash": hash}

	var result Letter
	err := letters.Find(lookFor).One(&result)
	if result.Password != "" {
		isValid := security.VerifyPassword(result.Password, password)
		if !isValid {
			return Letter{}, UnauthorizedUser
		}
		//get the key from the Salt in order to decrpt the message
		key, _, err := security.DeriveKey(password, result.Salt)
		if err != nil {
			fmt.Println("Error calculating key to decrypt the message ", err)
			panic(err)
		}

		//decrypt the message and only return what is necessary (if no password, dont' care about Salt)
		decryptedMessage, err := security.Decrypt(string(key), result.Message)
		if err != nil {
			fmt.Println("Error decrypting the message, ", err)
			panic(err)
		}
		result = Letter{
			Hash:    result.Hash,
			Title:   result.Title,
			Message: decryptedMessage,
			Person:  result.Person,
			Image:   result.Image,
			Expiry:  result.Expiry,
		}
	}
	return result, err
}
