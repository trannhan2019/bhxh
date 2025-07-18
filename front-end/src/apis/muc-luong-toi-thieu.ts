import axiosClient from "lib/axios";
import type { MucLuongToiThieu } from "types/muc-luong-toi-thieu";

const apiUrl = "/api/muc-luong-toi-thieu";

export const getMucLuongToiThieus = () => {
  return axiosClient.get<MucLuongToiThieu[]>(apiUrl);
};
