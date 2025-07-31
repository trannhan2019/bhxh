import axiosClient from "lib/axios";
import type { HeSoPhuCap } from "types/he-so-phu-cap";

const apiUrl = "/he-so-trach-nhiem";

export const getHeSoTrachNhiems = async () => {
  const response = await axiosClient.get<HeSoPhuCap[]>(apiUrl);
  return response.data;
};
