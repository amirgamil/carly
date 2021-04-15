package api

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/amirgamil/carly/db"
)

func WriteDB(w http.ResponseWriter, r *http.Request) {
	var letterToWrite db.Letter
	err := json.NewDecoder(r.Body).Decode(&letterToWrite)
	if err != nil {
		log.Fatal("Error parsing the JSON to create a new letter %s", err)
	}
	//make a call to db with letter to write
	db.AddNew(letterToWrite.Title, letterToWrite.Message, letterToWrite.Person, letterToWrite.Image)
}

func ReadDB(w http.ResponseWriter, r *http.Request) {

}
