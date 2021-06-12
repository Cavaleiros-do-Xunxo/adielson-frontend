import axios from "axios";
import config from "../config";
import SessionManager from "./sessionManager";

const _http = axios.create({
  baseURL: config.API_URL,
  timeout: 30000,
});

_http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 401) {
      SessionManager.clearSession();
    }

    return Promise.reject(error);
  }
);

const _getAuthHeader = () => {
  return { Authorization: `Bearer ${SessionManager.getAuthToken()}` };
};

const api = {
  getUserFromCurrentSession: () => {
    return _http.get("/users/0", { headers: _getAuthHeader() });
  },
  registerUser: (data) => {
    return _http.post("/register", data);
  },
  authenticate: (data) => {
    return _http.post("/login", data);
  },
};

export default api;
