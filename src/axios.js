import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8081/",
  //   timeout: 10000,
  headers: {
    "Content-Type": "application/json", // Indique que les données sont au format JSON
  },
});
