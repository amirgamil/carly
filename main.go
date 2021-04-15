package main

import (
	"api"
	"log"
	"net/http"
	"time"

	"github.com/amirgamil/carly/api"
	"github.com/gorilla/mux"
)

// "encoding/json"
// "io"s
// "io/ioutil"
// "log"
// "net/http"
// "os"
// "time"

func main() {

	r := mux.NewRouter()

	srv := &http.Server{
		Handler:      r,
		Addr:         "127.0.0.1:8998",
		WriteTimeout: 60 * time.Second,
		ReadTimeout:  60 * time.Second,
	}

	r.Methods("GET").Path("/api/{hash}").HandlerFunc(api.ReadDB)
	r.Methods("POST").Path("/api/{hash}").HandlerFunc(api.WriteDB)

	log.Printf("Server listening on %s\n", srv.Addr)
	log.Fatal(srv.ListenAndServe())
}
