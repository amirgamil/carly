package db

import "time"

type Letter struct {
	Hash     string    `json: "hash"`
	Expiry   time.Time `json: "expiry"`
	Password string    `json: "password"`
	Title    string    `json: "title"`
	Message  string    `json: "message"`
	Person   string    `json: "person"`
	Image    string    `json: "image"`
}
