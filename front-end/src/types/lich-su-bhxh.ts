import type { BacLuong } from "./bac-luong";
import type { HeSoPhuCap } from "./he-so-phu-cap";
import type { MucLuongToiThieu } from "./muc-luong-toi-thieu";
import type { NhanVien } from "./nhan-vien";

export type LichSuBhxh = {
  id: number;
  nhanVienId: number;
  bacLuongId: number;
  phuCapId: number | null;
  trachNhiemId: number | null;
  mucLuongToiThieuVungId: number;
  ngayApDung: Date | null;
  thongTinQD: string | null;
};

export type LichSuBhxhByNhanVien = LichSuBhxh & {
  nhanVien: NhanVien;
  bacLuong: BacLuong;
  phuCap: HeSoPhuCap | null;
  trachNhiem: HeSoPhuCap | null;
  mucLuongToiThieuVung: MucLuongToiThieu;
};
