package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	mongoURI = "mongodb://localhost:27017"
	dbName = "guests"
	collectionName = "guests"
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

	http.Handle("/", http.FileServer(http.Dir("../frontend/build")))
	http.HandleFunc("/getAllDocuments", getAllDocuments)

	fmt.Println("Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func initDb() {

	t := time.Now()

	formatted := fmt.Sprintf("%d-%02d-%02d", t.Year(), t.Month(), t.Day())

	seedData := []interface{} {
		GuestLog{Name: "Test Elek", Log: "Nagyon fasza, nagyon jó", Date: formatted},
		GuestLog{Name: "Qu Key", Log: "ching ding, chong bong", Date: formatted},
		GuestLog{Name: "L'e Copoá", Log: "Ca'va! Ca'va!", Date: formatted},
	}

	collection := client.Database(dbName).Collection(collectionName)

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


func getAllDocuments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Content-Type", "application/json")

	collection := client.Database(dbName).Collection(collectionName)

	cursor, err := collection.Find(context.Background(), bson.D{})

	if err != nil {
		http.Error(w, "Error fetching documents", http.StatusInternalServerError)
		return
	}

	defer cursor.Close(context.Background())

	var guestLogs []GuestLog
	if err = cursor.All(context.Background(), &guestLogs); err != nil {
		http.Error(w, "Error reading documents", http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(guestLogs); err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}
}

func write2Database() {}