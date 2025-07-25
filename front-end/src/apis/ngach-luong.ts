import axiosClient from "lib/axios";
import type { NgachLuong, NgachLuongWithBac } from "types/ngach-luong";

const apiUrl = "/api/ngach-luong";

export const getNgachLuongs = async () => {
  const response = await axiosClient.get<NgachLuong[]>(apiUrl);
  return response.data;
};

export const getNgachLuongBacLuongs = async () => {
  const response = await axiosClient.get<NgachLuongWithBac[]>(
    `${apiUrl}/bac-luong`
  );
  return response.data;
};
