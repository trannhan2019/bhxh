import type { BacLuongWithNgach } from "./bac-luong";
import type { HeSoPhuCap } from "./he-so-phu-cap";
import type { NhanVienWithPhong } from "./nhan-vien";

export type ThongTinBHXH = {
  id: number;
  nhanVienId: number;
  bacNgachLuongId: number;
  phuCapId: number | null;
  trachNhiemId: number | null;
  ngayApDung: Date;
  thongTin: string | null;
  isMaxBac: boolean;
};

export type ThongTinBHXHResponse = ThongTinBHXH & {
  nhanVien: NhanVienWithPhong;
  bacNgachLuong: BacLuongWithNgach;
  phuCap: HeSoPhuCap | null;
  trachNhiem: HeSoPhuCap | null;
};
