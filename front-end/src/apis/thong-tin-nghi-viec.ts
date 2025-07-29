import axiosClient from "lib/axios";
import type { ThongTinNghiViecWithNhanVien } from "types/thong-tin-nghi-viec";

const apiUrl = "/api/theo-doi-nghi-viec";

export const getTheoDoiNghiViecs = async () => {
  const response = await axiosClient.get<ThongTinNghiViecWithNhanVien[]>(
    apiUrl
  );
  return response.data;
};

export const xacNhanNghiViec = async (id: number) => {
  const response = await axiosClient.post(`${apiUrl}/xac-nhan/${id}`);
  return response.data;
};
