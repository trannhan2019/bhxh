import { type BacLuong } from "./bac-luong";

export type NgachLuong = {
  id: number;
  maNgach: string;
  chucDanh: string;
};

export type NgachLuongWithBac = NgachLuong & { bacLuongs: BacLuong[] };
