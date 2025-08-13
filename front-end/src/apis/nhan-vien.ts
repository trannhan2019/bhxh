import axiosClient from "lib/axios";
import type {
  NhanVienWithPhongChucVu,
  NhanVienWithPhongChucVuTotal,
} from "types/nhan-vien";

const apiUrl = "/nhan-vien";

export const getNhanViens = ({ page = 1, pageSize = 10 }) => {
  return axiosClient.get<NhanVienWithPhongChucVuTotal>(apiUrl, {
    params: { page, pageSize },
  });
};

export const getNhanVien = async (id: number) => {
  const response = await axiosClient.get<NhanVienWithPhongChucVu>(
    `${apiUrl}/${id}`
  );
  return response.data;
};
