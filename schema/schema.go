package schema

import (
	"time"

	"github.com/globalsign/mgo/bson"
)

type Letter struct {
	ID       bson.ObjectId `bson:"_id,omitempty"`
	Hash     string
	Expiry   time.Time `bson:"expiry" json:"expiry"`
	Password string
	Title    string
	Data     string
	Salt     []byte
}

type JSONLetter struct {
	Hash     string
	Expiry   string `json:"expiry"`
	Password string
	Title    string       `json:"title"`
	Data     []LetterData `json:"content"`
	Salt     []byte
}

//have to label json here so that when we send back array of it in JSON, it encodes it properly!
type LetterData struct {
	Name    string `json:"person"`
	Message string `json:"msg"`
	ImgAdd  string `json:"imgAdd"`
}
