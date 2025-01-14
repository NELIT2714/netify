import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_URL);

const api = axios.create({
	baseURL: API_URL,
	timeout: API_TIMEOUT,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
