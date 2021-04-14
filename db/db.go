package db

import (
	"os"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Warnf("Error loading .env file: %s", err.Error())
		panic(err)
	}

	mUser := os.Getenv("MONGO_USER")
	mPass := os.Getenv("MONGO_PASS")
	mIP := os.Getenv("MONGO_SHARD_URL")

}
