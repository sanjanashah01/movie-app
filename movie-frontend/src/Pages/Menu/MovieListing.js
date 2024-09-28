import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Col, Container, Row, Input, Button } from "reactstrap";
import { isFetching } from "../../helpers/utilityFunctions";
import APIMiddleware from "../../helpers/APIMiddleware";
import { isEmpty } from "lodash";
import MovieTile from "./MovieTile";

export default function MovieListing() {
  const isFetchingRef = useRef(false);
  const [movies, setMovies] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 3;

  useEffect(() => {
    if (!isFetchingRef.current) {
      isFetching(isFetchingRef);
      fetchMovies();
      fetchGenres();
      fetchYears();
    }
  }, []);

  const fetchMovies = async (searchTerm = "", genre = "", year = "") => {
    try {
      const response = await APIMiddleware.get(
        `${process.env.REACT_APP_BASE_URL}/movies?title=${searchTerm}&genre=${genre}&year=${year}`
      );
      if (response.data === null) {
        setMovies([]);
      } else {
        setMovies(response.data);
      }
    } catch (error) {
      console.error(error);
      setToastMessage("Error fetching movie data.");
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await APIMiddleware.get(
        `${process.env.REACT_APP_BASE_URL}/genres`
      );
      setGenres(response.data);
    } catch (error) {
      console.error(error);
      setToastMessage("Error fetching genres.");
    }
  };

  const fetchYears = async () => {
    try {
      const response = await APIMiddleware.get(
        `${process.env.REACT_APP_BASE_URL}/years`
      );
      setYears(response.data);
    } catch (error) {
      console.error(error);
      setToastMessage("Error fetching years.");
    }
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    fetchMovies(newSearchTerm, selectedGenre, selectedYear);
    setCurrentPage(1);
  };

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    fetchMovies(searchTerm, genre, selectedYear);
    setCurrentPage(1);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    fetchMovies(searchTerm, selectedGenre, year);
    setCurrentPage(1);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Input
                    type="text"
                    placeholder="Search by Title"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="mt-3"
                  />
                  <div style={{ display: "flex", gap: "50px" }}>
                    <Input
                      type="select"
                      value={selectedGenre}
                      onChange={handleGenreChange}
                      className="mt-3"
                    >
                      <option value="">Select Genre</option>
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </Input>
                    <Input
                      type="select"
                      value={selectedYear}
                      onChange={handleYearChange}
                      className="mt-3"
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Input>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            {isEmpty(currentMovies) ? (
              <Col lg={12} className="text-center mt-4">
                <h5>No movies found</h5>
              </Col>
            ) : (
              currentMovies.map((movie) => (
                <Col md="4" key={movie.id} className="mb-4">
                  <MovieTile movie={movie} onDelete={fetchMovies} />
                </Col>
              ))
            )}
          </Row>

          {/* Pagination Controls */}
          {movies.length > moviesPerPage && (
            <Row>
              <Col lg={12} className="text-center mt-4">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    active={currentPage === index + 1}
                    className="mx-2"
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </Button>
              </Col>
            </Row>
          )}
        </Container>
        {!isEmpty(toastMessage) ? (
          <div
            className="position-fixed top-0 end-0 p-3"
            style={{ zIndex: "1005" }}
          >
            <div className="alert alert-danger">
              <strong>Error:</strong> {toastMessage}
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}
