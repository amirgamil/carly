package api

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/amirgamil/carly/db"
)

type letter struct {
	hash    string
	title   string
	message string
	person  string
	image   string
}

func WriteDB(w http.ResponseWriter, r *http.Request) {
	var letterToWrite letter
	err := json.NewDecoder(r).Decode(&letterToWrite)
	if err != nil {
		log.Fatal("Error parsing the JSON to create a new letter")
	}
	//make a call to db with letter to write
	db.AddNew(letterToWrite.title, letterToWrite.message, letterToWrite.person, letterToWrite.image)
}

func ReadDB(w http.ResponseWriter, r *http.Request) {

}
