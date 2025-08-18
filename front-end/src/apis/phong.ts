import axiosClient from "lib/axios";
import type { Phong } from "types/phong";

const apiUrl = "/phong";

export const getPhongs = () => {
  return axiosClient.get<Phong[]>(apiUrl);
};

export const getPhongById = async (id: number) => {
  const res = await axiosClient.get<Phong>(`${apiUrl}/${id}`);
  return res.data;
};

export const addPhong = (phong: Omit<Phong, "id">) => {
  return axiosClient.post<Phong>(apiUrl, phong);
};

export const updatePhong = (id: number, phong: Omit<Phong, "id">) => {
  return axiosClient.patch<Phong>(`${apiUrl}/${id}`, phong);
};

export const deletePhong = (id: number) => {
  return axiosClient.delete(`${apiUrl}/${id}`);
};
