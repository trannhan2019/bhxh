import type { HeSoPhuCap, HeSoTrachNhiem, BacLuong } from '@prisma/client';
import dayjs from 'dayjs';

export function tinhMucLuongBhxh(
  phuCap: HeSoPhuCap | undefined,
  trachNhiem: HeSoTrachNhiem | undefined,
  bacLuong: BacLuong | undefined,
) {
  const phuCapSalary = phuCap ? phuCap.heSo * 4410000 : 0;
  const trachNhiemSalary = trachNhiem ? trachNhiem.heSo * 4410000 : 0;
  const bacSalary = bacLuong ? bacLuong.heSo * 4410000 : 0;
  return phuCapSalary + trachNhiemSalary + bacSalary;
}

export function tinhNgayApDungNext(
  ngayApDung: string,
  bacLuong: BacLuong | undefined,
) {
  const soNgayNangBac = bacLuong ? bacLuong.thoiGianNangBac + 1 : 0;
  return bacLuong
    ? dayjs(ngayApDung).add(soNgayNangBac, 'day').toISOString()
    : null;
}
