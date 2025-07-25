import type { BacLuong } from "./bac-luong";
import type { HeSoPhuCap } from "./he-so-phu-cap";
import type { NgachLuongWithBac } from "./ngach-luong";
import type { NhanVien, NhanVienWithPhong } from "./nhan-vien";

export type ThongTinBhxh = {
  id: number;
  nhanVienId: number;
  ngachLuongId: number;
  bacLuongId: number;
  phuCapId: number | null;
  trachNhiemId: number | null;
  ngayApDung: Date;
  thongTin: string | null;
  lastEmailSentAt: Date | null;
};

export type ThongTinBHXHWithNhanVienNgachLuongBacLuong = ThongTinBhxh & {
  nhanVien: NhanVien;
  ngachLuong: NgachLuongWithBac;
  bacLuong: BacLuong;
};

export type ThongTinBHXHResponse = ThongTinBhxh & {
  nhanVien: NhanVienWithPhong;
  ngachLuong: NgachLuongWithBac;
  bacLuong: BacLuong;
  phuCap: HeSoPhuCap | null;
  trachNhiem: HeSoPhuCap | null;
};
