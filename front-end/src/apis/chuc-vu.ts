import axiosClient from "lib/axios";
import type { ChucVu } from "types/chuc-vu";

const apiUrl = "/chuc-vu";

export const getChucVus = async () => {
  const res = await axiosClient.get<ChucVu[]>(apiUrl);
  return res.data;
};
