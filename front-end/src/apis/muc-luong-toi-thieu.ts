import type { MucLuongToiThieuFormData } from "components/muc-luong-toi-thieu/muc-luong-toi-thieu-modal";
import axiosClient from "lib/axios";
import type { MucLuongToiThieu } from "types/muc-luong-toi-thieu";

const apiUrl = "/muc-luong-toi-thieu";

export const getMucLuongToiThieus = async () => {
  const response = await axiosClient.get<MucLuongToiThieu[]>(apiUrl);
  return response.data;
};

export const getMucLuongToiThieu = async (id: number) => {
  const response = await axiosClient.get<MucLuongToiThieu>(`${apiUrl}/${id}`);
  return response.data;
};

export const getMucLuongToiThieuMoiNhat = async () => {
  const response = await axiosClient.get<MucLuongToiThieu>(
    `${apiUrl}/moi-nhat`
  );
  return response.data;
};

export const createMucLuongToiThieu = async (
  data: MucLuongToiThieuFormData
) => {
  const response = await axiosClient.post<MucLuongToiThieu>(apiUrl, data);
  return response.data;
};

export const updateMucLuongToiThieu = async (
  id: number,
  data: MucLuongToiThieuFormData
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
