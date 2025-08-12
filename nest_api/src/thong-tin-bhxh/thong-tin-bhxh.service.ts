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

  async xacNhan(id: number) {
    const thongTin = await this.thongTinBhxh(id);
    if (!thongTin) throw new Error('Not found');
    const isMaxBac =
      thongTin.ngachLuong.bacLuongs.length === thongTin.bacLuong.bac;
    const kiemTraDieuKienNgayNangLuong =
      dayjs(thongTin.ngayApDung)
        .add(thongTin.bacLuong.thoiGianNangBac, 'day')
        .diff(dayjs(), 'day') < this.SO_NGAY_KIEM_TRA;

    if (!isMaxBac && kiemTraDieuKienNgayNangLuong) {
      const bacLuongMoi = await this.prisma.bacLuong.findFirstOrThrow({
        where: {
          bac: thongTin.bacLuong.bac + 1,
          ngachLuongId: thongTin.ngachLuongId,
        },
      });
      //update bậc lương BHXH
      await this.prisma.thongTinBhxh.update({
        where: { id: id },
        data: {
          bacLuongId: bacLuongMoi.id,
          ngayApDung: dayjs(thongTin.ngayApDung)
            .add(thongTin.bacLuong.thoiGianNangBac, 'day')
            .toDate(),
        },
      });
      // Lấy mức lương tối thiểu vùng mới nhất
      const mucLuong = await this.prisma.mucLuongToiThieuVung.findFirstOrThrow({
        orderBy: { thoiGianApdung: 'desc' },
      });
      // Thêm mới lịch sử BHXH
      await this.prisma.lichSuBhxh.create({
        data: {
          nhanVienId: thongTin.nhanVienId,
          bacLuongId: bacLuongMoi.id,
          phuCapId: thongTin.phuCapId,
          trachNhiemId: thongTin.trachNhiemId,
          mucLuongToiThieuVungId: mucLuong.id,
          ngayApDung: dayjs(thongTin.ngayApDung).toDate(),
          thongTinQD: thongTin.thongTin,
        },
      });
    }
    return thongTin;
  }
}
