import axios from "axios";

const APIMiddleware = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default APIMiddleware;
