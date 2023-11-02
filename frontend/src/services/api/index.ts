import axios from "axios";
import { getItemFromStorage, removeItemFromStorage, setItemToStorage } from "../../utils/localStorage";

const { REACT_APP_BASE_URL } = process.env;
// Login and Registration

export const requestWithoutAuth = axios.create({
  baseURL: REACT_APP_BASE_URL,
  timeout: 30000,
});

// Если у вас есть Токен (Acsess and Refresh)

// Acsess 1 день
// Refresh 30 дней

export const request = axios.create({
  baseURL: REACT_APP_BASE_URL,
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${getItemFromStorage("access_token")}`,
  },
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      removeItemFromStorage("access_token");
      axios
        .put(`${REACT_APP_BASE_URL}` + "/users/refresh", {
          refreshToken: getItemFromStorage("refresh_token"),
        })
        .then((response: any) => {
          setItemToStorage("access_token", response?.data?.accessToken);
          setItemToStorage("refresh_token", response?.data?.refreshToken);
        })
        .catch((error) => {
          removeItemFromStorage("refresh_token");
          window.location.reload();
          window.location.pathname = "/";
        });
    }
    return Promise.reject(error);
  }
);

request.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...config.headers,
      // common: {
      Authorization: "Bearer " + getItemFromStorage("access_token"),
      // }
    };
    return config;
  },
  (error) => Promise.reject(error)
);
