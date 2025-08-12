import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ThongTinNghiViecDto } from './thong-tin-nghi-viec.dto';

@Injectable()
export class ThongTinNghiViecService {
  constructor(private prisma: PrismaService) {}

  thongTinNghiViecs() {
    return this.prisma.thongTinNghiViec.findMany({
      include: {
        nhanVien: true,
        // nhanVien: {
        //   include: { phong: true, chucVu: true },
        // },
      },
    });
  }

  async xacNhan(id: number, thongTinNghiViec: ThongTinNghiViecDto) {
    await this.prisma.nhanVien.update({
      where: { id },
      data: { daNghiViec: thongTinNghiViec.thoiGianKetThuc },
    });
    return this.prisma.thongTinNghiViec.create({
      data: {
        nhanVienId: id,
        thoiGianKetThuc: thongTinNghiViec.thoiGianKetThuc,
        thongTinKhac: thongTinNghiViec.thongTinKhac,
      },
    });
  }
}
