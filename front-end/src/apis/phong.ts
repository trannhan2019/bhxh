import axiosClient from "lib/axios";
import type { Phong } from "types/phong";

const apiUrl = "/phong";

export const getPhongs = () => {
  return axiosClient.get<Phong[]>(apiUrl);
};
