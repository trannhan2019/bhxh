import axiosClient from "lib/axios";
import type { MucLuongToiThieu } from "types/muc-luong-toi-thieu";

const apiUrl = "/muc-luong-toi-thieu";

export const getMucLuongToiThieus = () => {
  return axiosClient.get<MucLuongToiThieu[]>(apiUrl);
};

export const getMucLuongToiThieuMoiNhat = async () => {
  const response = await axiosClient.get<MucLuongToiThieu>(
    `${apiUrl}/moi-nhat`
  );
  return response.data;
};

export const createMucLuongToiThieu = async (
  data: Omit<MucLuongToiThieu, "id">
) => {
  const response = await axiosClient.post<MucLuongToiThieu>(apiUrl, data);
  return response.data;
};

export const updateMucLuongToiThieu = async (
  id: number,
  data: Omit<MucLuongToiThieu, "id">
) => {
  const response = await axiosClient.put<MucLuongToiThieu>(
    `${apiUrl}/${id}`,
    data
  );
  return response.data;
};

export const deleteMucLuongToiThieu = async (id: number) => {
  const response = await axiosClient.delete(`${apiUrl}/${id}`);
  return response.data;
};
