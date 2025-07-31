import axiosClient from "lib/axios";
import type { ThongTinNghiViecWithNhanVien } from "types/thong-tin-nghi-viec";
import { schema } from "components/theo-doi-nghi-viec/nghi-viec-modal-xac-nhan";
import { z } from "zod";

const apiUrl = "/theo-doi-nghi-viec";

export const getTheoDoiNghiViecs = async () => {
  const response = await axiosClient.get<ThongTinNghiViecWithNhanVien[]>(
    apiUrl
  );
  return response.data;
};

export const xacNhanNghiViec = async (
  id: number,
  values: z.infer<typeof schema>
) => {
  const response = await axiosClient.post(`${apiUrl}/xac-nhan/${id}`, values);
  return response.data;
};
