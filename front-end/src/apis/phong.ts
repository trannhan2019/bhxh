import axiosClient from "lib/axios";
import type { Phong } from "types/phong";

const apiUrl = "/api/phong";

export const getPhongs = () => {
  return axiosClient.get<Phong[]>(apiUrl);
};
