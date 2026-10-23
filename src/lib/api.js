import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const submitQuote = (payload) => api.post("/quotes", payload).then((r) => r.data);
export const submitContact = (payload) => api.post("/contacts", payload).then((r) => r.data);
export const submitApplication = (payload) => api.post("/careers", payload).then((r) => r.data);
