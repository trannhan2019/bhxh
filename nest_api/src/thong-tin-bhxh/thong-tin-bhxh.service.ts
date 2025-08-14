import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import dayjs from 'dayjs';
import { tinhMucLuongBhxh, tinhNgayApDungNext } from 'src/utils/luong-bhxh';

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
        ngachLuong: true,
        bacLuong: true,
        phuCap: true,
        trachNhiem: true,
        ngachLuongNext: true,
        bacLuongNext: true,
        phuCapNext: true,
        trachNhiemNext: true,
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
        ngachLuong: true,
        ngachLuongNext: true,
        bacLuong: true,
        bacLuongNext: true,
        phuCap: true,
        phuCapNext: true,
        trachNhiem: true,
        trachNhiemNext: true,
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

  async xacNhanNangBac(id: number) {
    const thongTin = await this.thongTinBhxh(id);
    if (!thongTin) throw new NotFoundException('Not found');
    const isMaxBac = thongTin.daMaxBac;
    const kiemTraDieuKienNgayNangLuong =
      dayjs(thongTin.ngayNangBacNext).diff(dayjs(), 'day') <
      this.SO_NGAY_KIEM_TRA;

    if (!isMaxBac && kiemTraDieuKienNgayNangLuong) {
      const bacLuongMoi = await this.prisma.bacLuong.findFirstOrThrow({
        where: {
          bac: thongTin.bacLuong.bac + 1,
          ngachLuongId: thongTin.ngachLuongId,
        },
      });
      const bacLuongNext = await this.prisma.bacLuong.findFirstOrThrow({
        where: {
          bac: bacLuongMoi.bac + 1,
          ngachLuongId: thongTin.ngachLuongId,
        },
      });
      // Lấy mức lương tối thiểu vùng mới nhất
      const mucLuong = await this.prisma.mucLuongToiThieuVung.findFirstOrThrow({
        orderBy: { thoiGianApdung: 'desc' },
      });
      //update bậc lương BHXH
      await this.prisma.thongTinBhxh.update({
        where: { id: id },
        data: {
          bacLuongId: bacLuongMoi.id,
          mucLuong: tinhMucLuongBhxh(
            thongTin.phuCap,
            thongTin.trachNhiem,
            bacLuongMoi,
          ),
          ngayApDung: thongTin.ngayNangBacNext || dayjs().toISOString(),
          bacLuongNextId: bacLuongNext ? bacLuongNext.id : null,
          mucLuongNext: bacLuongNext
            ? tinhMucLuongBhxh(
                thongTin.phuCap,
                thongTin.trachNhiem,
                bacLuongNext,
              )
            : null,
          ngayNangBacNext: bacLuongNext
            ? tinhNgayApDungNext(thongTin.ngayNangBacNext, bacLuongNext)
            : null,
          daMaxBac: bacLuongNext ? false : true,
        },
      });

      // Thêm mới lịch sử BHXH
      await this.prisma.lichSuBhxh.create({
        data: {
          nhanVienId: thongTin.nhanVienId,
          bacLuongId: bacLuongMoi.id,
          phuCapId: thongTin.phuCapId,
          trachNhiemId: thongTin.trachNhiemId,
          mucLuongToiThieuVungId: mucLuong.id,
          ngayApDung: dayjs(thongTin.ngayApDung).toISOString(),
          thongTinQD: thongTin.thongTin,
        },
      });
    }
    return thongTin;
  }

  async xacNhanChuyenNgach() {}
}
