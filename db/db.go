package db

import (
	"fmt"
	"os"

	"github.com/amirgamil/carly/security"
	"github.com/joho/godotenv"
)

const TitleLimit = 100
const ContentLimit = 100000

func initDB() {
	err := godotenv.Load()
	if err != nil {
		log.Warnf("Error loading .env file: %s", err.Error())
		panic(err)
	}

	mUser := os.Getenv("MONGO_USER")
	mPass := os.Getenv("MONGO_PASS")
	mIP := os.Getenv("MONGO_SHARD_URL")

	initSession(mUser, mPass, mIP)

}

func AddNew(title string, message string, person string, image string) {
	urlHash := security.GenerateUniqueHash(string[:20])
	fmt.Println(urlHash)
}
