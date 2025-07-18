import axios from "axios";

export const api = axios.create({
  baseURL: "", // handled in vite.config proxy setup
  headers: { "Content-Type": "application/json" },
});
