import axiosClient from "lib/axios";
import type { LichSuBhxhByNhanVien } from "types/lich-su-bhxh";

const apiUrl = "/api/lich-su-bhxh";

export const getLichSuBhxhByNhanVien = async (id: number) => {
  const response = await axiosClient.get<LichSuBhxhByNhanVien[]>(
    `${apiUrl}/${id}`
  );
  return response.data;
};
