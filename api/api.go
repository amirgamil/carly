package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/amirgamil/carly/db"
	"github.com/amirgamil/carly/schema"
	"github.com/gorilla/mux"
)

func preflightResponse(w *http.ResponseWriter, r *http.Request) {
	//if in production, replace with https://carly.amirbolous.com
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func WriteDB(w http.ResponseWriter, r *http.Request) {
	// Allow CORS
	preflightResponse(&w, r)
	fmt.Println((*r).Method)
	if (*r).Method == "OPTIONS" {
		return
	}
	//generic data structure to decode JSON data into (strings to any data types)
	var letterCard schema.JSONLetter
	err := json.NewDecoder(r.Body).Decode(&letterCard)
	if err != nil {
		fmt.Println("Error parsing json data from frontend ", err)
	}
	// make a call to db with letter to write
	urlHash := db.AddNew(letterCard.Title, letterCard.Data, letterCard.Expiry, letterCard.Password)
	toReturn := map[string]string{
		"hash": urlHash,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(toReturn)
}

func HandleLetter(w http.ResponseWriter, r *http.Request) {
	getLetterWithPassword(w, r, "")
}

func HandleLetterWithPassword(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseMultipartForm(0)
	password := r.FormValue("password")
	fmt.Println("Attempted password ", password)
	getLetterWithPassword(w, r, password)
}

func getLetterWithPassword(w http.ResponseWriter, r *http.Request, password string) {
	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	fmt.Println(vars["hash"])
	res, err := db.LookUp(vars["hash"], password)
	if err != nil {
		switch err {
		case db.UnauthorizedUser:
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Println("User is not authorized my dude ", err)
		default:
			w.WriteHeader(http.StatusBadRequest)
			fmt.Println("Couldn't find the letter for %s", vars["hash"])
		}

		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}
