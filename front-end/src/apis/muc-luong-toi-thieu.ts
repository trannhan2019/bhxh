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
