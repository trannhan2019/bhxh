import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import dayjs from 'dayjs';

@Injectable()
export class ThongTinBhxhService {
  constructor(private prisma: PrismaService) {}

  private SO_NGAY_KIEM_TRA = 15;

  async thongTinBhxhs() {
    return await this.prisma.thongTinBhxh.findMany({
      where: {
        nhanVien: {
          is: {
            daNghiViec: null, // Lọc những nhân viên chưa nghỉ việc
          },
        },
      },
      include: {
        nhanVien: {
          include: { phong: true },
        },
        bacLuong: true,
        ngachLuong: {
          include: { bacLuongs: true },
        },
        phuCap: true,
        trachNhiem: true,
      },
    });
  }

  async thongTinBhxh(id: number) {
    return await this.prisma.thongTinBhxh.findUnique({
      where: { id },
      include: {
        nhanVien: {
          include: { phong: true },
        },
        bacLuong: true,
        ngachLuong: {
          include: { bacLuongs: true },
        },
        phuCap: true,
        trachNhiem: true,
      },
    });
  }

  async thongTinBhxhGanDenHan() {
    const thongTinBhxhs = await this.prisma.thongTinBhxh.findMany({
      where: {
        nhanVien: {
          is: { daNghiViec: null },
        },
      },
      include: {
        nhanVien: true,
        ngachLuong: {
          include: { bacLuongs: true },
        },
        bacLuong: true,
      },
    });

    const now = dayjs();

    const locThongTin = thongTinBhxhs.filter((thongTin) => {
      const ngayApDung = dayjs(thongTin.ngayApDung);
      const ngayDenHan = ngayApDung.add(
        thongTin.bacLuong.thoiGianNangBac,
        'day',
      );
      return (
        thongTin.ngachLuong.bacLuongs.length !== thongTin.bacLuong.bac &&
        ngayDenHan.diff(now, 'day') <= this.SO_NGAY_KIEM_TRA
      );
    });

    return locThongTin;
  }
}
