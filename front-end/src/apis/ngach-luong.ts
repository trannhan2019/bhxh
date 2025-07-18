import axiosClient from "lib/axios";
import type { NgachLuongWithBac } from "types/ngach-luong";

const apiUrl = "/api/ngach-luong";

export const getNgachLuongs = () => {
  return axiosClient.get<NgachLuongWithBac[]>(apiUrl);
};
