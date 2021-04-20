package db

import (
	"fmt"
	"os"
	"time"

	"github.com/amirgamil/carly/security"
	"github.com/joho/godotenv"
)

const TitleLimit = 100
const ContentLimit = 100000

func init() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file: %s", err.Error())
		panic(err)
	}

	mUser := os.Getenv("MONGO_USER")
	mPass := os.Getenv("MONGO_PASS")
	mIP := os.Getenv("MONGO_SHARD_URL")

	initSession(mUser, mPass, mIP)
	fmt.Println(letters)
}

func AddNew(title string, content string, person string, image string, expiry string, password string) string {
	titleArr := []byte(title)
	err := checkLengths(title, content)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	urlHash := security.GenerateUniqueHash(string(titleArr[:20]))
	expiryDate, err := time.Parse(time.RFC3339, expiry)
	if err != nil {
		fmt.Println("Error parsing the date %s", err)
	}

	new := Letter{
		Hash:     urlHash,
		Title:    title,
		Message:  content,
		Expiry:   expiryDate,
		Person:   person,
		Image:    image,
		Password: password,
	}

	if password != "" {
		keyDer, salt, err := security.DeriveKey(password, nil)
		if err != nil {
			panic(err)
		}
		new.Salt = salt

		encryptedContent, err := security.Encrypt(keyDer, content)
		if err != nil {
			fmt.Println("Error encrypting the content ", err)
		}
		new.Message = encryptedContent

		hashedPassword, err := security.HashPassword(password)
		if err != nil {
			fmt.Println("Error hashing the password ", err)
		}
		new.Password = hashedPassword

	}

	fmt.Printf("%+v\n", new)

	//TODO: bunch of checks for password and stuff
	insertErr := insert(new)
	if insertErr != nil {
		fmt.Println("Error inserting a new letter in the db: ", insertErr)
	}
	return urlHash

}

func checkLengths(title string, content string) error {
	if len(title) > TitleLimit {
		return fmt.Errorf("title is longer than character limit of %d\n", TitleLimit)
	}
	if len(content) > ContentLimit {
		return fmt.Errorf("content is longer than character limit of %d\n", ContentLimit)
	}

	return nil
}

func LookUp(hash string, password string) (Letter, error) {
	return fetch(hash, password)
}
