package security

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"log"

	"github.com/amirgamil/carly/schema"
	"golang.org/x/crypto/scrypt"
)

func Encrypt(key string, data []schema.LetterData) (string, error) {
	//generate a new aes cipher block with the key we have
	//aes works by transforming data into blocks or grids of bytes to work with
	//it does not operate on a long sequence of text
	//For more info, see https://www.youtube.com/watch?v=O4xNJsjtN6E&ab_channel=Computerphile
	cipherBlock, err := aes.NewCipher([]byte(key))
	if err != nil {
		log.Println("Error creating a cipher key, ", err)
	}

	// wrap block cipher with Galois Counter Mode and standard nonce length
	gcm, err := cipher.NewGCM(cipherBlock)
	if err != nil {
		return "", err
	}

	// creates a new byte array the size of the nonce
	// which must be passed to Seal
	nonce := make([]byte, gcm.NonceSize())
	if _, err = rand.Read(nonce); err != nil {
		return "", err
	}

	marshalledData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("Error marshalling the data for encryption ", err)
	}
	//seal nonce with data to use during decryption
	cipherText := gcm.Seal(nonce, nonce, marshalledData, nil)

	//cipherText is jibber jabber that needs to be decrypted by the key to be understood
	return string(cipherText), nil
}

func Decrypt(key string, data string) ([]schema.LetterData, error) {
	//similar to encrypt
	cipherBlock, err := aes.NewCipher([]byte(key))
	if err != nil {
		log.Println("Error creating a cipher key, ", err)
	}

	// wrap block cipher with Galois Counter Mode and standard nonce length
	gcm, err := cipher.NewGCM(cipherBlock)
	if err != nil {
		return nil, err
	}

	//TODO: don't understand what this does, need to go over it
	// extract the nonce from the data
	nonce, cipherText := data[:gcm.NonceSize()], data[gcm.NonceSize():]

	// use nonce to decrypt the data
	marshalledData, err := gcm.Open(nil, []byte(nonce), []byte(cipherText), nil)
	if err != nil {
		return nil, err
	}
	var cardData []schema.LetterData
	errM := json.Unmarshal(marshalledData, &cardData)
	if err != nil {
		log.Println("Error unmarshalling encrypted data ", errM)
	}
	return cardData, nil

}

//use key length of 16
const keyBytes = 16
const cpuLimit = 16384
const relativeMemoryCost = 8
const relativeCPUCost = 1

//Securely get key from password (Percival et al. https://www.tarsnap.com/scrypt/scrypt.pdf)
func DeriveKey(password string, salt []byte) (string, []byte, error) {
	if salt == nil {
		//reads and copies keyBytes into a new byte array
		salt = make([]byte, keyBytes)
		if _, err := rand.Read(salt); err != nil {
			return "", nil, err
		}
	}

	derivedKey, err := scrypt.Key([]byte(password), salt, cpuLimit, relativeMemoryCost, relativeCPUCost, keyBytes)
	if err != nil {
		log.Println("Error getting a derived key ", err)
		return "", nil, err
	}
	return string(derivedKey), salt, nil
}
