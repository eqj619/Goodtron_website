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

// Optional multipart endpoint for RFQ file uploads. The current backend only
// accepts JSON, so without this the RFQ form lists files and asks the customer
// to email them after submitting.
const RFQ_UPLOAD_URL = process.env.REACT_APP_RFQ_UPLOAD_URL;
export const rfqUploadEnabled = Boolean(RFQ_UPLOAD_URL);

export const submitRfqWithFiles = (payload, files) => {
  const body = new FormData();
  Object.entries(payload).forEach(([k, v]) => v != null && body.append(k, v));
  files.forEach((f) => body.append("files", f));
  return axios.post(RFQ_UPLOAD_URL, body).then((r) => r.data);
};
