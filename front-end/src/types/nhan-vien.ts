import type { ChucVu } from "./chuc-vu";
import type { Phong } from "./phong";

export type NhanVien = {
  id: number;
  ten: string;
  soThuTu: number;
  isActive: boolean;
};

export type NhanVienWithPhong = NhanVien & { phong: Phong };

export type NhanVienWithPhongChucVu = NhanVien & {
  phong: Phong;
  chucVu: ChucVu;
};

export type NhanVienWithPhongChucVuTotal = {
  data: NhanVienWithPhongChucVu[];
  total: number;
};
