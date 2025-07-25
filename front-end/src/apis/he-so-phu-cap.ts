import axiosClient from "lib/axios";
import type { HeSoPhuCap } from "types/he-so-phu-cap";

const apiUrl = "/api/he-so-phu-cap";

export const getHeSoPhuCaps = async () => {
  const response = await axiosClient.get<HeSoPhuCap[]>(apiUrl);
  return response.data; // <--- DÒNG NÀY RẤT QUAN TRỌNG: TRẢ VỀ CHỈ PHẦN DATA THỰC TẾ
};
