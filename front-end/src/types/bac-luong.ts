import type { NgachLuong } from "./ngach-luong";

export type BacLuong = {
  id: number;
  bac: number;
  heSo: number;
  thoiGianNangBac: number;
  ngachId: number;
};

export type BacLuongWithNgach = BacLuong & {
  ngach: NgachLuong;
};
