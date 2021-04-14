package main

import (
	// "encoding/json"
	// "io"s
	// "io/ioutil"
	// "log"
	// "net/http"
	// "os"
	// "time"

	"fmt"

	"github.com/globalsign/mgo"
)

type Person struct {
	Name  string
	Phone string
}

func main() {

	URIfmt := "mongodb://127.0.0.1:27017" //eventually add user and password

	session, err := mgo.Dial(URIfmt)
	if err != nil {
		panic(err)
	}

	c := session.DB("test").C("people")
	err = c.Insert(&Person{"Ale", "+55 53 8116 9639"})
	if err != nil {
		fmt.Println(err)
	}
	// r := mux.NewRouter()
	// srv := &http.Server{
	// 	Handler:      r,
	// 	Addr:         "127.0.0.1:8998",
	// 	WriteTimeout: 60 * time.Second,
	// 	ReadTimeout:  60 * time.Second,
	// }

	// // r.HandleFunc("/api/{hash}")

	// log.Printf("Server listening on %s\n", srv.Addr)
	// log.Fatal(srv.ListenAndServe())
}
