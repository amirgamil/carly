package main

import (
	// "encoding/json"
	// "io"
	// "io/ioutil"
	// "log"
	// "net/http"
	// "os"
	// "time"

	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func doSomething(w http.ResponseWriter, r *http.Request) {

}

func main() {
	r := mux.NewRouter()

	srv := &http.Server{
		Handler:      r,
		Addr:         "127.0.0.1:8998",
		WriteTimeout: 60 * time.Second,
		ReadTimeout:  60 * time.Second,
	}

	r.HandleFunc("/api/{hash}")

	log.Printf("Server listening on %s\n", srv.Addr)
	log.Fatal(srv.ListenAndServe())
}
