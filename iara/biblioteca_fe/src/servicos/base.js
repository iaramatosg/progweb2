import axios from "axios";

class Base {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000",
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("access_token");
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    );
  }
}

export default Base;
