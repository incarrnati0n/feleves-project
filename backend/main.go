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
	http.Handle("/", http.FileServer(http.Dir("../frontend/build")))
	http.HandleFunc("/getAllDocuments", getAllDocuments)
	http.HandleFunc("/writeDocument", write2Database)

	fmt.Println("Server running on port 1337!")
	log.Fatal(http.ListenAndServe(":1337", nil))
}

func initDb() {
	seedData := []interface{}{
		GuestLog{Name: "asd", Log: "kek", Date: "2000-01-01"},
		GuestLog{Name: "asd2", Log: "kek1", Date: "2000-01-01"},
		GuestLog{Name: "asd3", Log: "kek2", Date: "2000-01-01"},
		GuestLog{Name: "asd4", Log: "kek3", Date: "2000-01-01"},
	}

	collection := client.Database(dbName).Collection(collectionName)
	_, err := collection.InsertMany(context.Background(), seedData)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Data seeded")
}

func init() {
	clientOptions := options.Client().ApplyURI(mongoURI)

	var err error
	client, err = mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to MongoDB!")

	initDb()
}


func getAllDocuments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

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

func write2Database(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, POST")
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var newGuestLog GuestLog
	err := json.NewDecoder(r.Body).Decode(&newGuestLog)
	if err != nil {
		http.Error(w, "Invalid JSON input", http.StatusBadRequest)
		return
	}

	t := time.Now()

	newGuestLog.Date = fmt.Sprintf("%d-%02d-%02d", t.Year(), t.Month(), t.Day())

	collection := client.Database(dbName).Collection(collectionName)

	_, err = collection.InsertOne(context.Background(), newGuestLog)

	if err != nil {
		http.Error(w, "Error inserting document", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, `{"message": "Guestlog successfully added"}`)

}