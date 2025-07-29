import type { NhanVienWithPhongChucVu } from "./nhan-vien";

export type ThongTinNghiViec = {
  id: number;
  nhanVienId: number;
  thoiGianKetThuc: Date;
  thongTinKhac: string;
};

export type ThongTinNghiViecWithNhanVien = ThongTinNghiViec & {
  nhanVien: NhanVienWithPhongChucVu;
};
