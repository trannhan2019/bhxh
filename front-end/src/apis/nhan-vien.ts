import axiosClient from "lib/axios";
import type { NhanVienWithPhongChucVuTotal } from "types/nhan-vien";

const apiUrl = "/api/nhan-vien";

export const getNhanViens = ({ page = 1, pageSize = 10 }) => {
  return axiosClient.get<NhanVienWithPhongChucVuTotal>(apiUrl, {
    params: { page, pageSize },
  });
};
