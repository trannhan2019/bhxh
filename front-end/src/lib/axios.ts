import { nprogress } from "@mantine/nprogress";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});

axiosClient.interceptors.response.use((response) => {
  nprogress.complete();
  return response;
});

export default axiosClient;
