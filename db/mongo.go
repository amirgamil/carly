package db

import (
	"fmt"

	"github.com/globalsign/mgo"
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

	//create index with hash ready to put new elements in
	//establishes connection to letters database only if unique key
	_ = Session.DB("main").C("letters").EnsureIndex(uniqueHash)

	letters = Session.DB("main").C("letters")
	fmt.Println("Established connection to %s", letters)
}

func insert(new Letter) error {
	return letters.Insert(new)
}
