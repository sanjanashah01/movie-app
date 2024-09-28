import React, { useState } from "react";
import { Card, CardBody, Modal } from "reactstrap";
import Star from "./Star";
import { Link } from "react-router-dom";
import APIMiddleware from "../../helpers/APIMiddleware";

const MovieTile = ({ movie, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  const renderStars = (rating) => {
    return (
      <>
        {[...Array(5)].map((_, index) => (
          <Star key={index} filled={index < rating} />
        ))}
      </>
    );
  };

  const deleteMovie = async (id) => {
    try {
      await APIMiddleware.delete(
        `${process.env.REACT_APP_BASE_URL}/movies/${id}`
      );
      setModalOpen(false);
      onDelete();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card className="movie-tile">
      <CardBody>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h5>{movie.title}</h5>
            <h6>
              <span style={{ color: "grey" }}>Genre: </span>
              {movie.genre}
            </h6>
            <h6>
              <span style={{ color: "grey" }}>Year:</span> {movie.year}
            </h6>
            <h6>
              <span style={{ color: "grey", paddingRight: "5px" }}>
                Rating:
              </span>
              {renderStars(movie.rating)}
            </h6>
          </div>
          <div>
            <Link to={`/edit-movie/${movie._id}`}>
              <button
                title="Edit"
                style={{
                  backgroundColor: "transparent",
                  color: "green",
                  border: "none",
                  paddingLeft: "0px",
                }}
              >
                <i
                  className="bx bxs-edit align-bottom me-1"
                  style={{ fontSize: "1.125rem" }}
                ></i>{" "}
              </button>
            </Link>
            <button
              title="Delete"
              style={{
                backgroundColor: "transparent",
                color: "#e42626",
                border: "none",
                paddingLeft: "0px",
              }}
              onClick={() => {
                setCurrentMovie(movie);
                setModalOpen(true);
              }}
            >
              <i
                className="bx bxs-trash align-bottom me-1"
                style={{ fontSize: "1.125rem" }}
              ></i>{" "}
            </button>
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
              <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                  Delete Movie
                </h5>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="close"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete the movie titled "
                  {currentMovie?.title}"?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => deleteMovie(currentMovie._id)}
                >
                  <span className="bx bxs-trash"></span> Delete
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MovieTile;
