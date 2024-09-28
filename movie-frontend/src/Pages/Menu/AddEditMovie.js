import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { isEmpty } from "lodash";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import APIMiddleware from "../../helpers/APIMiddleware";

export default function AddEditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState({});
  const [toastMessage, setToastMessage] = useState("");

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: movieDetails.title || "",
      genre: movieDetails.genre || "",
      year: movieDetails.year || "",
      rating: movieDetails.rating || "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Please enter the movie title"),
      genre: Yup.string().required("Please enter the genre"),
      year: Yup.number()
        .min(1900, "Year should not be less than 1900")
        .max(new Date().getFullYear(), "Year should not be in the future")
        .required("Please enter the release year"),
      rating: Yup.number()
        .min(0, "Rating should be between 0 and 5")
        .max(5, "Rating should be between 0 and 5")
        .required("Please enter the rating"),
    }),

    onSubmit: (values) => {
      if (id) {
        updateMovie(values);
      } else {
        addMovie(values);
      }
    },
  });

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await APIMiddleware.get(
        `${process.env.REACT_APP_BASE_URL}/movies/${id}`
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setToastMessage(error.response.data.message);
    }
  };

  const updateMovie = async (values) => {
    try {
      await APIMiddleware.put(
        `${process.env.REACT_APP_BASE_URL}/movies/${id}`,
        values
      );
      navigate("/movies");
    } catch (error) {
      console.error("Error updating movie:", error);
      setToastMessage(error.response.data.message);
    }
  };

  const addMovie = async (values) => {
    try {
      await APIMiddleware.post(
        `${process.env.REACT_APP_BASE_URL}/movies`,
        values
      );
      navigate("/movies");
    } catch (error) {
      console.error("Error adding movie:", error);
      setToastMessage(error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Form
                    className="needs-validation"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="title">Movie Title</Label>
                          <Input
                            name="title"
                            placeholder="Enter movie title"
                            type="text"
                            id="title"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.title || ""}
                            invalid={
                              validation.touched.title &&
                              validation.errors.title
                            }
                          />
                          {validation.touched.title &&
                          validation.errors.title ? (
                            <FormFeedback>
                              {validation.errors.title}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="genre">Genre</Label>
                          <Input
                            name="genre"
                            placeholder="Enter genre"
                            type="text"
                            id="genre"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.genre || ""}
                            invalid={
                              validation.touched.genre &&
                              validation.errors.genre
                            }
                          />
                          {validation.touched.genre &&
                          validation.errors.genre ? (
                            <FormFeedback>
                              {validation.errors.genre}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="year">Year</Label>
                          <Input
                            name="year"
                            placeholder="Enter release year"
                            type="number"
                            id="year"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.year || ""}
                            invalid={
                              validation.touched.year && validation.errors.year
                            }
                          />
                          {validation.touched.year && validation.errors.year ? (
                            <FormFeedback>
                              {validation.errors.year}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="rating">Rating</Label>
                          <Input
                            name="rating"
                            placeholder="Enter rating (0-5)"
                            type="number"
                            id="rating"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.rating || ""}
                            invalid={
                              validation.touched.rating &&
                              validation.errors.rating
                            }
                          />
                          {validation.touched.rating &&
                          validation.errors.rating ? (
                            <FormFeedback>
                              {validation.errors.rating}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="primary" type="submit">
                      {id ? "Update Movie" : "Add Movie"}
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
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
