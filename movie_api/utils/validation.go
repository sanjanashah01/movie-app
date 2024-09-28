package utils

import (
	"context"
	"movie_api/db"
	"movie_api/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ValidateMovieData(movie models.Movie, currentMovieID ...primitive.ObjectID) (bool, string) {
	filter := bson.M{
		"title": bson.M{
			"$regex":   "^" + movie.Title + "$",
			"$options": "i",
		},
	}

	if len(currentMovieID) > 0 {
		filter["_id"] = bson.M{"$ne": currentMovieID[0]}
	}

	count, err := db.MovieCollection.CountDocuments(context.TODO(), filter)
	if err != nil {
		return false, "Error checking for duplicate movie titles"
	}

	if count > 0 {
		return false, "Duplicate movie title"
	}

	return true, "Data validated"
}
