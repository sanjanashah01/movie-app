import React from "react";
import { Navigate } from "react-router-dom";

import MovieListing from "../Pages/Menu/MovieListing.js";
import AddEditMovie from "../Pages/Menu/AddEditMovie.js";

const publicRoutes = [
  {
    path: "/",
    exact: true,
    component: <Navigate to="/movies" />,
  },
  { path: "/movies", component: <MovieListing /> },
  { path: "/add-movie", component: <AddEditMovie /> },
  { path: "/edit-movie/:id", component: <AddEditMovie /> },
];

export { publicRoutes };
