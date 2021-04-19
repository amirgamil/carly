package db

import (
	"time"

	"github.com/globalsign/mgo/bson"
)

type Letter struct {
	ID       bson.ObjectId `bson:"_id,omitempty"`
	Hash     string
	Expiry   time.Time `bson:"expiry" json:"expiry,string"`
	Password string
	Title    string `json:"title"`
	Message  string `json:"message"`
	Person   string `json:"person"`
	Image    string `json: "image"`
}
