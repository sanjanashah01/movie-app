package handlers

import (
	"context"
	"movie_api/db"
	"movie_api/models"
	"movie_api/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetMovies(c *gin.Context) {
	title := c.Query("title")
	genre := c.Query("genre")
	year := c.Query("year")

	var movies []models.Movie
	filter := bson.M{}

	if title != "" {
		filter["title"] = bson.M{"$regex": title, "$options": "i"}
	}
	if genre != "" {
		filter["genre"] = genre
	}
	if year != "" {
		yearInt, err := strconv.Atoi(year)
		if err == nil {
			filter["year"] = yearInt
		}
	}

	cursor, err := db.MovieCollection.Find(context.TODO(), filter)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "Error fetching movies"})
		return
	}
	defer cursor.Close(context.TODO())

	for cursor.Next(context.TODO()) {
		var a models.Movie
		if err := cursor.Decode(&a); err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "Error decoding movie"})
			return
		}
		movies = append(movies, a)
	}

	c.IndentedJSON(http.StatusOK, movies)
}

func GetMovieByID(c *gin.Context) {
	id := c.Param("id")

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid ID format"})
		return
	}

	var a models.Movie
	err = db.MovieCollection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&a)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Movie not found"})
		return
	}
	c.IndentedJSON(http.StatusOK, a)
}

func PostMovie(c *gin.Context) {
	var newMovie models.Movie
	if err := c.BindJSON(&newMovie); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid movie data"})
		return
	}

	isValid, validationMessage := utils.ValidateMovieData(newMovie)
	if !isValid {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": validationMessage})
		return
	}

	_, err := db.MovieCollection.InsertOne(context.TODO(), newMovie)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "Error adding movie"})
		return
	}

	c.IndentedJSON(http.StatusCreated, newMovie)
}

func UpdateMovie(c *gin.Context) {
	id := c.Param("id")
	var updatedMovie models.Movie

	if err := c.BindJSON(&updatedMovie); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid movie data"})
		return
	}

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid ID format"})
		return
	}

	isValid, validationMessage := utils.ValidateMovieData(updatedMovie, objID)
	if !isValid {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": validationMessage})
		return
	}

	filter := bson.M{"_id": objID}
	update := bson.M{"$set": updatedMovie}
	result, err := db.MovieCollection.UpdateOne(context.TODO(), filter, update)
	if err != nil || result.ModifiedCount == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Movie not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, updatedMovie)
}

func DeleteMovie(c *gin.Context) {
	id := c.Param("id")

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid ID format"})
		return
	}

	result, err := db.MovieCollection.DeleteOne(context.TODO(), bson.M{"_id": objID})
	if err != nil || result.DeletedCount == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Movie not found"})
		return
	}
	c.IndentedJSON(http.StatusOK, gin.H{"message": "Movie deleted"})
}

func GetUniqueGenres(c *gin.Context) {
	cursor, err := db.MovieCollection.Distinct(context.TODO(), "genre", bson.M{})
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "Error fetching genres"})
		return
	}

	genres := make([]string, len(cursor))
	for i, genre := range cursor {
		genres[i] = genre.(string)
	}

	c.IndentedJSON(http.StatusOK, genres)
}

func GetUniqueYears(c *gin.Context) {
	cursor, err := db.MovieCollection.Distinct(context.TODO(), "year", bson.M{})
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "Error fetching years"})
		return
	}

	years := make([]int, len(cursor))
	for i, year := range cursor {
		years[i] = int(year.(int32))
	}

	c.IndentedJSON(http.StatusOK, years)
}
