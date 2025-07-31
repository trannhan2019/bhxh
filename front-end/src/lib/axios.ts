import { nprogress } from "@mantine/nprogress";
import axios from "axios";

const hostname = window.location.hostname;
const axiosClient = axios.create({
  //baseURL: import.meta.env.VITE_API_URL, ||env.development - VITE_API_URL=http://localhost:5000 ||env.production - VITE_API_URL=http://172.16.11.206:5000
  baseURL: `http://${hostname}:5000/api`,
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
