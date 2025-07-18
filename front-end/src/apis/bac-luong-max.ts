import axiosClient from "lib/axios";
import type { BacLuongMax } from "types/bac-luong-max";

const apiUrl = "/api/bac-luong-max";

export const getBacLuongMax = () => {
  return axiosClient.get<BacLuongMax[]>(apiUrl);
};
