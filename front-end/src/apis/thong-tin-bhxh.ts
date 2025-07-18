import axiosClient from "lib/axios";
import type { ThongTinBHXHResponse } from "types/thong-tin-bhxh";

const apiUrl = "/api/theo-doi-bhxh";

export const getTheoDoiBHXHs = () => {
  return axiosClient.get<ThongTinBHXHResponse[]>(apiUrl);
};

export const getTheoDoiBHXH = async (id: number) => {
  const response = await axiosClient.get<ThongTinBHXHResponse>(
    `${apiUrl}/${id}`
  );
  return response.data;
};
