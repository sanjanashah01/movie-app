---

# Movie Management Application

This is a full-stack movie management application with a React frontend and GoLang backend, connected to a MongoDB database. The app allows users to create, update, view, and delete movie entries with validations for movie details.

## Project Structure

- **Frontend**: React (Create React App)
- **Backend**: GoLang (with MongoDB)
- **Database**: MongoDB

---

## Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the `frontend` directory, you can run:

#### `npm run start`

Runs the app in the development mode.\
Open =(http://localhost:3000) to view it in the browser.

---

## Backend

The backend for this application is built using GoLang and MongoDB.

### Prerequisites

- Go (version 1.18 or higher)
- MongoDB (local or cloud instance)

### Setup Backend

#### After cloning this repository

#### Install Dependencies:

```bash
go mod tidy
```

#### MongoDB Setup:

Ensure that MongoDB is running on your local machine or use a cloud-based MongoDB instance. 

#### Run the Backend:

```bash
go run main.go
```

This will start the API server at (http://localhost:8080).

### API Endpoints

- `GET /movies`: Retrieve all movies.
- `GET /movies/{id}`: Retrieve a movie by ID.
- `POST /movies`: Add a new movie.
- `PUT /movies/{id}`: Update an existing movie.
- `DELETE /movies/{id}`: Delete a movie by ID.

### Validation Rules

- **Unique Titles**: Movie titles are case-insensitive and must be unique.
- **Valid Year**: The year must be between 1900 and the current year.

---

## Running the Full Application

To run the full stack, ensure both the frontend and backend are set up and running.

1. **Backend**: Start the GoLang server using `go run main.go`.
2. **Frontend**: Navigate to the `frontend` directory and run `npm run start`.

Once both are running:

- The frontend will be accessible at (http://localhost:3000).
- The backend API will be accessible at (http://localhost:8080).

---

## Learn More

- React Documentation: [https://reactjs.org/](https://reactjs.org/)
- GoLang Documentation: [https://golang.org/doc/](https://golang.org/doc/)
- MongoDB Documentation: [https://docs.mongodb.com/](https://docs.mongodb.com/)

---
