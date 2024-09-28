package routes

import (
	"movie_api/handlers"

	"github.com/gin-gonic/gin"
)

func MovieRoutes(router *gin.Engine) {
	router.GET("/movies", handlers.GetMovies)
	router.GET("/movies/:id", handlers.GetMovieByID)
	router.POST("/movies", handlers.PostMovie)
	router.PUT("/movies/:id", handlers.UpdateMovie)
	router.DELETE("/movies/:id", handlers.DeleteMovie)
	router.GET("/genres", handlers.GetUniqueGenres)
	router.GET("/years", handlers.GetUniqueYears)
}
