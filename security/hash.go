package security

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
)

const urlLength = 7

//Create unique identifier for string and timestamp
func GenerateUniqueHash(content string) string {
	timeStamp := time.Now().String()
	fmt.Println(timeStamp)
	return hashString(timeStamp + content)[:urlLength]
}

//hash string by sum and encoding the resultant sum from hex back to a string
func hashString(stringToHash string) string {
	b := []byte(stringToHash)
	hashSum := md5.Sum(b)
	return hex.EncodeToString(hashSum[:])
}

//TODO: add security via a password
func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassWord([]byte(password), bcrypt.DefaultCost)
	return string(hash), err
}
