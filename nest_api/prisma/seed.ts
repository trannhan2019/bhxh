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

async function main() {
  const prisma = new PrismaClient();

  await prisma.phong.createMany({ data: phongData });
  await prisma.chucVu.createMany({ data: chucvuData });
  await prisma.nhanVien.createMany({ data: nhanVienData });
  await prisma.mucLuongToiThieuVung.createMany({
    data: mucLuongToiThieuData,
  });
  await prisma.heSoTrachNhiem.createMany({ data: trachNhiemData });
  await prisma.heSoPhuCap.createMany({ data: phuCapData });
  await prisma.ngachLuong.createMany({ data: ngachLuongData });
  await prisma.bacLuong.createMany({ data: bacLuongData });
  await prisma.thongTinBhxh.createMany({ data: thongTinBhxhData });
  await prisma.lichSuBhxh.createMany({ data: lichSuBhxhData });

  console.log('Seed completed');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
