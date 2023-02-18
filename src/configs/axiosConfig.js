import axios from "axios";
import { baseUrl } from "../constant/constant";

export const axiosConnect = (token = "", timeout = 5000) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: timeout,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
  return axiosInstance;
};
