package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/amirgamil/carly/db"
	"github.com/gorilla/mux"
)

func WriteDB(w http.ResponseWriter, r *http.Request) {
	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")

	_ = r.ParseMultipartForm(0)
	title := r.FormValue("title")
	message := r.FormValue("message")
	person := r.FormValue("person")
	image := r.FormValue("image")
	expiry := r.FormValue("expiry")
	password := r.FormValue("password")
	//make a call to db with letter to write
	urlHash := db.AddNew(title, message, person, image, expiry, password)
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
