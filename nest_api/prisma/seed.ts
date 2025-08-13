import { PrismaClient } from '@prisma/client';
import { phongData } from './data/phong.data';
import { chucvuData } from './data/chuc-vu.data';
import { nhanVienData } from './data/nhan-vien.data';
import { mucLuongToiThieuData } from './data/muc-luong-toi-thieu.data';
import { trachNhiemData } from './data/trach-nhiem.data';
import { phuCapData } from './data/phu-cap.data';
import { ngachLuongData } from './data/ngach-luong.data';
import { bacLuongData } from './data/bac-luong.data';
import { thongTinBhxhData } from './data/thong-tin-bhxh.data';
import { lichSuBhxhData } from './data/lich-su-bhxh.data';
import { tinhMucLuongBhxh, tinhNgayApDungNext } from '../src/utils/luong-bhxh';

const prisma = new PrismaClient();

async function clearTable(tableName: string) {
  // Xoá dữ liệu
  await prisma.$executeRawUnsafe(`DELETE FROM "${tableName}"`);
  // Reset auto-increment về 1
  await prisma.$executeRawUnsafe(
    `DELETE FROM sqlite_sequence WHERE name='${tableName}'`,
  );
}

async function createThongTinBhxh() {
  for (let thongTin of thongTinBhxhData) {
    let phuCap = phuCapData.find((item) => item.id === thongTin.phuCapId);
    let trachNhiem = trachNhiemData.find(
      (item) => item.id === thongTin.trachNhiemId,
    );
    let bacLuong = bacLuongData.find((item) => item.id === thongTin.bacLuongId);
    let bacLuongs = bacLuongData.filter(
      (item) => item.ngachLuongId === thongTin.ngachLuongId,
    );
    let daMaxBac = bacLuong?.bac === bacLuongs.length ? true : false;
    let bacLuongNext = daMaxBac
      ? undefined
      : bacLuongs.find((item) => item.bac === (bacLuong?.bac ?? 0) + 1);
    await prisma.thongTinBhxh.create({
      data: {
        nhanVienId: thongTin.nhanVienId,
        ngachLuongId: thongTin.ngachLuongId,
        bacLuongId: thongTin.bacLuongId,
        phuCapId: thongTin.phuCapId,
        trachNhiemId: thongTin.trachNhiemId,
        mucLuong: tinhMucLuongBhxh(phuCap, trachNhiem, bacLuong),
        ngayApDung: thongTin.ngayApDung,
        thongTin: '',
        ngachLuongNextId: daMaxBac ? null : thongTin.ngachLuongId,
        bacLuongNextId: daMaxBac ? null : bacLuongNext?.id,
        phuCapNextId: daMaxBac ? null : thongTin.phuCapId,
        trachNhiemNextId: daMaxBac ? null : thongTin.trachNhiemId,
        mucLuongNext: daMaxBac
          ? null
          : tinhMucLuongBhxh(phuCap, trachNhiem, bacLuongNext),
        ngayNangBacNext: daMaxBac
          ? null
          : tinhNgayApDungNext(thongTin.ngayApDung, bacLuong),
        daMaxBac: daMaxBac,
        lastEmailSentAt: null,
      },
    });
  }
}

async function main() {
  // Xoá theo thứ tự để tránh lỗi khoá ngoại
  await clearTable('LichSuBhxh');
  await clearTable('ThongTinBhxh');
  await clearTable('BacLuong');
  await clearTable('NgachLuong');
  await clearTable('HeSoPhuCap');
  await clearTable('HeSoTrachNhiem');
  await clearTable('MucLuongToiThieuVung');
  await clearTable('NhanVien');
  await clearTable('ChucVu');
  await clearTable('Phong');

  // Insert lại dữ liệu
  await prisma.phong.createMany({ data: phongData });
  await prisma.chucVu.createMany({ data: chucvuData });
  await prisma.nhanVien.createMany({ data: nhanVienData });
  await prisma.mucLuongToiThieuVung.createMany({ data: mucLuongToiThieuData });
  await prisma.heSoTrachNhiem.createMany({ data: trachNhiemData });
  await prisma.heSoPhuCap.createMany({ data: phuCapData });
  await prisma.ngachLuong.createMany({ data: ngachLuongData });
  await prisma.bacLuong.createMany({ data: bacLuongData });
  // await prisma.thongTinBhxh.createMany({ data: thongTinBhxhData });
  await createThongTinBhxh();
  await prisma.lichSuBhxh.createMany({ data: lichSuBhxhData });

  console.log('Seed completed');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
