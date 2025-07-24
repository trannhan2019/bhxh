import axiosClient from "lib/axios";
import type { NhanVienWithPhongChucVu } from "types/nhan-vien";

const apiUrl = "/api/nhan-vien";

export const getNhanViens = ({ page = 1, pageSize = 10 }) => {
  return axiosClient.get<NhanVienWithPhongChucVu>(apiUrl, {
    params: { page, pageSize },
  });
};
