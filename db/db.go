package db

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/amirgamil/carly/schema"
	"github.com/amirgamil/carly/security"
	"github.com/joho/godotenv"
)

const TitleLimit = 100
const CardLimit = 25
const ContentLimit = 100000

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file: %s", err.Error())
	}

	mUser := os.Getenv("MONGO_USER")
	mPass := os.Getenv("MONGO_PASS")
	mIP := os.Getenv("MONGO_SHARD_URL")
	initSession(mUser, mPass, mIP)
}

func AddNew(title string, content []schema.LetterData, expiry string, password string) string {
	titleArr := []byte(title)
	err := checkLengths(title, content)
	if err != nil {
		log.Println(err)
	}

	urlHash := security.GenerateUniqueHash(string(titleArr[:20]))
	expiryDate, err := time.Parse(time.RFC3339, expiry)
	if err != nil {
		log.Println("Error parsing the date %s", err)
	}
	marshalledContent, err := json.Marshal(content)
	if err != nil {
		log.Println("Error marshalling content")
	}
	new := schema.Letter{
		Hash:     urlHash,
		Title:    title,
		Data:     string(marshalledContent),
		Expiry:   expiryDate,
		Password: password,
	}

	if password != "" {
		keyDer, salt, err := security.DeriveKey(password, nil)
		if err != nil {
			log.Println(err)
		}
		new.Salt = salt

		encryptedContent, err := security.Encrypt(keyDer, content)
		if err != nil {
			log.Println("Error encrypting the content ", err)
		}
		new.Data = encryptedContent

		hashedPassword, err := security.HashPassword(password)
		if err != nil {
			log.Println("Error hashing the password ", err)
		}
		new.Password = hashedPassword

	}

	// fmt.Printf("%+v\n", new)
	_, insertErr := insert(new)
	if insertErr != nil {
		fmt.Println("Error inserting a new letter in the db: ", insertErr)
	}
	return urlHash

}

func checkLengths(title string, content []schema.LetterData) error {
	if len(title) > TitleLimit {
		return fmt.Errorf("title is longer than character limit of %d\n", TitleLimit)
	}
	if len(content) > CardLimit {
		return fmt.Errorf("# of cards is longer than limit of %d\n", CardLimit)
	}
	for _, s := range content {
		if len(s.Message) > ContentLimit {
			return fmt.Errorf("content within a card is longer than character limit of %d\n", ContentLimit)
		}
	}

	return nil
}

func LookUp(hash string, password string) (schema.JSONLetter, error) {
	return fetch(hash, password)
}
