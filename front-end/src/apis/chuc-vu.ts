import axiosClient from "lib/axios";
import type { ChucVu } from "types/chuc-vu";

const apiUrl = "/api/chuc-vu";

export const getChucVus = () => {
  return axiosClient.get<ChucVu[]>(apiUrl);
};
