import axiosClient from "lib/axios";
import type {
  ThongTinBHXHResponse,
  ThongTinBHXHWithNhanVienNgachLuongBacLuong,
} from "types/thong-tin-bhxh";

const apiUrl = "/thong-tin-bhxh";

export const getTheoDoiBHXHs = () => {
  return axiosClient.get<ThongTinBHXHResponse[]>(apiUrl);
};

export const getTheoDoiBHXH = async (id: number) => {
  const response = await axiosClient.get<ThongTinBHXHResponse>(
    `${apiUrl}/${id}`
  );
  return response.data;
};

export const reportExcel = async (id: number) => {
  const response = await axiosClient.get<Promise<Blob>>(
    `${apiUrl}/report/${id}`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

export const getBhxhNotificationEmail = async () => {
  const response = await axiosClient.get<
    ThongTinBHXHWithNhanVienNgachLuongBacLuong[]
  >(`${apiUrl}/notification`);
  return response.data;
};

export const xacNhanNangLuong = async (id: number) => {
  const response = await axiosClient.get(`${apiUrl}/xac-nhan/${id}`);
  return response.data;
};
