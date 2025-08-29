// src/apiConfig.js

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "https://mern-login-eta.vercel.app/api/auth";

export default API_URL;