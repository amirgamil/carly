package db

import (
	"log"

	"github.com/globalsign/mgo"
)

func init(user string, pass string, ip string) {
	// load .env file
	URIfmt := "mongodb://127.0.0.1:27017" //eventually add user and password

	if err != nil {
		log.Warnf("Error loading .env file: %s", err.Error())
		log.Warn("Falling back on env vars...")
	}

	session, err := mgo.Dial(URIfmt)
	if err != nil {
		log.Warnf("Error starting Mongo session")
	}

	c := session.DB("test").C("people")
}

func main() {

}
