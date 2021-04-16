package db

import (
	"fmt"
	"os"

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

func AddNew(title string, content string, person string, image string) {
	titleArr := []byte(title)
	err := checkLengths(title, content)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	urlHash := security.GenerateUniqueHash(string(titleArr[:20]))
	fmt.Println(urlHash)

	new := Letter{
		Hash:    urlHash,
		Title:   title,
		Message: content,
		Person:  person,
		Image:   image,
	}
	fmt.Printf("%+v\n", new)

	//TODO: bunch of checks for password and stuff
	insertErr := insert(new)
	if insertErr != nil {
		fmt.Println("Error inserting a new letter in the db: ", insertErr)
	}

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

func LookUp(hash string) (Letter, error) {
	return fetch(hash)
}
