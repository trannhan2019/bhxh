import axiosClient from "lib/axios";
import type { LichSuBhxhByNhanVien } from "types/lich-su-bhxh";

const apiUrl = "/lich-su-bhxh";

export const getLichSuBhxhByNhanVien = async (id: number) => {
  const response = await axiosClient.get<LichSuBhxhByNhanVien[]>(
    `${apiUrl}/nhan-vien/${id}`
  );
  return response.data;
};
