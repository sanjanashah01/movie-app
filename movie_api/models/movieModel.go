package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Movie struct {
	ID     primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Title  string             `json:"title" bson:"title"`
	Genre  string             `json:"genre" bson:"genre"`
	Year   int                `json:"year" bson:"year"`
	Rating int                `json:"rating" bson:"rating"`
}
