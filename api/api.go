package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/amirgamil/carly/db"
	"github.com/gorilla/mux"
)

func WriteDB(w http.ResponseWriter, r *http.Request) {
	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var letterToWrite db.Letter
	err := json.NewDecoder(r.Body).Decode(&letterToWrite)
	if err != nil {
		log.Fatal("Error parsing the JSON to create a new letter %s", err)
	}
	//make a call to db with letter to write
	db.AddNew(letterToWrite.Title, letterToWrite.Message, letterToWrite.Person, letterToWrite.Image)
}

func ReadDB(w http.ResponseWriter, r *http.Request) {
	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Println(db.Letter{})
	vars := mux.Vars(r)
	res := db.LookUp(vars["hash"])
	fmt.Println(res)
}
