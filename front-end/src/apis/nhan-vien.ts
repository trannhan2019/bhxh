import axiosClient from "lib/axios";
import type { NhanVienWithPhongChucVu } from "types/nhan-vien";

const apiUrl = "/api/nhan-vien";

export const getNhanViens = ({ page = 1, pageSize = 10 }) => {
  return axiosClient.get<NhanVienWithPhongChucVu>(apiUrl, {
    params: { page, pageSize },
  });
};

export const getNhanVien = async (id: number) => {
  const response = await axiosClient.get<NhanVienWithPhongChucVu>(
    `${apiUrl}/${id}`
  );
  return response.data;
};
