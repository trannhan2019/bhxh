import dayjs from "dayjs";
import { DAY_15, DAY_30, DAY_7 } from "./constants";
import type { BacLuong } from "types/bac-luong";

export const timBacLuongTiepTheo = (
  bacLuong: BacLuong,
  bacLuongs: BacLuong[]
) => {
  const bacLuongTiepTheo = bacLuongs.find(
    (item) => item.bac === bacLuong.bac + 1
  );
  return bacLuongTiepTheo;
};

export const tinhSoNgayNangBacConLai = (
  ngayApDung: Date | undefined,
  thoiGianNangBac: number
) => {
  return dayjs(ngayApDung).add(thoiGianNangBac, "day").diff(dayjs(), "day");
};

export const isGanDenHanNangBac = (
  ngayApDung: Date | undefined,
  thoiGianNangBac: number
) => {
  return tinhSoNgayNangBacConLai(ngayApDung, thoiGianNangBac) < DAY_15;
};

export const formatNgayVN = (date: Date | undefined) =>
  dayjs(date).format("DD/MM/YYYY");

export const formatNgayApDungTiepTheo = (
  ngayApDung: Date | undefined,
  thoiGianNangBac: number
) => {
  return dayjs(ngayApDung).add(thoiGianNangBac, "day").format("DD/MM/YYYY");
};

export const formatColorTheoNgayApDung = (
  ngayApDung: Date,
  thoiGianNangBac: number
) => {
  const ngayHientai = dayjs();
  const ngayApDungTiepTheo = dayjs(ngayApDung).add(thoiGianNangBac, "day");

  const soNgayConLai = ngayApDungTiepTheo.diff(ngayHientai, "day");

  // console.log(ngayHientai, ngayApDungTiepTheo, soNgayConLai);
  // THỜI GIAN ĐỀU LẤY THEO GIỜ Z - GMT+0

  if (soNgayConLai < DAY_7) {
    return "red";
  } else if (soNgayConLai < DAY_15) {
    return "orange";
  } else if (soNgayConLai < DAY_30) {
    return "yellow";
  } else {
    return "blue";
  }
};

export const isBacLuongMax = (
  bacLuong: BacLuong | undefined,
  bacLuongs: BacLuong[] | undefined
) => {
  return bacLuongs?.length === bacLuong?.bac;
};

export const calculateTotalSalary = (
  hsphuCap: number | undefined,
  hstrachNhiem: number | undefined,
  bacLuong: BacLuong | undefined,
  mucLuong: number
) => {
  const phuCapSalary = hsphuCap ? hsphuCap * mucLuong : 0;
  const trachNhiemSalary = hstrachNhiem ? hstrachNhiem * mucLuong : 0;
  const bacSalary = bacLuong ? bacLuong.heSo * mucLuong : 0;
  return phuCapSalary + trachNhiemSalary + bacSalary;
};
