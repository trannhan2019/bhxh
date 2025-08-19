import type { NhanVienFormData } from "components/nhan-vien/nhan-vien-modal";
import axiosClient from "lib/axios";
import type {
  NhanVien,
  NhanVienWithPhongChucVu,
  NhanVienWithPhongChucVuTotal,
} from "types/nhan-vien";

const apiUrl = "/nhan-vien";

export const getNhanViens = async ({
  page = 1,
  pageSize = 10,
  search = "",
}) => {
  const response = await axiosClient.get<NhanVienWithPhongChucVuTotal>(apiUrl, {
    params: { page, pageSize, search },
  });
  return response.data;
};

export const getNhanVien = async (id: number) => {
  const response = await axiosClient.get<NhanVienWithPhongChucVu>(
    `${apiUrl}/${id}`
  );
  return response.data;
};

export const createNhanVien = async (nhanVien: NhanVienFormData) => {
  const data = {
    ...nhanVien,
    chucVuId: Number(nhanVien.chucVuId),
    phongId: Number(nhanVien.phongId),
  };
  const response = await axiosClient.post<NhanVien>(apiUrl, data);
  return response.data;
};

export const updateNhanVien = async (
  id: number,
  nhanVien: NhanVienFormData
) => {
  const data = {
    ...nhanVien,
    chucVuId: Number(nhanVien.chucVuId),
    phongId: Number(nhanVien.phongId),
  };
  const response = await axiosClient.patch<NhanVien>(`${apiUrl}/${id}`, data);
  return response.data;
};

export const deleteNhanVien = async (id: number) => {
  const response = await axiosClient.delete(`${apiUrl}/${id}`);
  return response.data;
};
