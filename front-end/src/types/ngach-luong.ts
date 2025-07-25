import { type BacLuong } from "./bac-luong";

export type NgachLuong = {
  id: number;
  maNgach: string;
  chucDanh: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NgachLuongWithBac = NgachLuong & { bacLuong: BacLuong[] };
