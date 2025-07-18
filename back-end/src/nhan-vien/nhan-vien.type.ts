import { ChucVu } from '../chuc-vu/chuc-vu.type';
import { Phong } from '../phong/phong.type';

export type NhanVien = {
  id: number;
  ten: string;
  soThuTu: number;
  isActive: boolean;
};

export type NhanVienWithPhongChucVu = NhanVien & {
  phong: Phong;
  chucVu: ChucVu;
};

export type NhanVienWithPhongChucVuTotal = {
  data: NhanVienWithPhongChucVu[];
  total: number;
};
