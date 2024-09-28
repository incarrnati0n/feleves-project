package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	mongoURI = "mongodb://localhost:27017"
	dbName = "guests"
	collection = "guests"
)

type GuestLog struct {
	Name string `json:"name"`
	Log string `json:"log"`
	Date string `json:"data"`
}

var client *mongo.Client

func main() {
	fmt.Println("Hello world!")
	connect()
}

func initDb() {

	t := time.Now()

	formatted := fmt.Sprintf("%d-%02d-%02d", t.Year(), t.Month(), t.Day())

	seedData := []interface{} {
		GuestLog{Name: "Test Elek", Log: "Nagyon fasza, nagyon jó", Date: formatted},
		GuestLog{Name: "Qu Key", Log: "ching ding, chong bong", Date: formatted},
		GuestLog{Name: "L'e Copoá", Log: "Ca'va! Ca'va!", Date: formatted},
	}

	collection := client.Database(dbName).Collection(collection)

	_, err := collection.InsertMany(context.Background(), seedData)

	if err != nil {
		log.Fatal(err)
	}

	log.Println("Database successfully seeded!")
}

func connect() {
	clientOptions := options.Client().ApplyURI(mongoURI)

	var err error

	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), nil)

	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to MongoDB database!")

	initDb()
}


func fetchAll() {
	
}

func writeDatabase() {}