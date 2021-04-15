package db

import (
	"log"

	"github.com/globalsign/mgo"
)

var Session *mgo.Session
var letters *mgo.Collection

func initSession(user string, pass string, ip string) {
	// load .env file
	URIfmt := "mongodb://127.0.0.1:27017" //eventually add user and password

	if err != nil {
		log.Warnf("Error loading .env file: %s", err.Error())
		log.Warn("Falling back on env vars...")
	}

	Session, err := mgo.Dial(URIfmt)
	if err != nil {
		log.Warnf("Error starting Mongo session")
	}

	uniqueHash := mgo.Index{
		Key:    []string{"hash"},
		Unique: true,
	}

	//ensure key is unique with mgo.EnsureIndex
	//establishes connection to letters database only if unique key
	letters := Session.DB("main").C("letters").EnsureIndex(uniqueHash)
}

func main() {

}
