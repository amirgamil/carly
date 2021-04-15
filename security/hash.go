package security

import (
	"crypto/md5"
	"encoding/hex"
	"time"
)

const urlLength = 7


//Create unique identifier for string and timestamp
func GenerateUniqueHash(content string) {
	timeStamp := time.Now().String()
	return hashString(timeStamp + content)[:urlLength]
}


//hash string by sum and encoding the resultant sum from hex back to a string
func hashString(stringToHash string) {
	b := []byte(stringToHash)
	hashSum := md5.Sum(b)
	return hex.EncodeToString(hash([:]))
}



//TODO: add security via a password


