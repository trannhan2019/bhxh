import type { NgachLuong } from "./ngach-luong";

export type BacLuong = {
  id: number;
  bac: number;
  heSo: number;
  thoiGianNangBac: number;
  ngachLuongId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type BacLuongWithNgach = BacLuong & {
  ngachLuong: NgachLuong;
};
