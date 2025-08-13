import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NhanVienService {
  constructor(private prisma: PrismaService) {}

  async nhanViens({ page = 1, pageSize = 20 }) {
    const nhanVienList = await this.prisma.nhanVien.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { soThuTu: 'asc' },
      include: { chucVu: true, phong: true },
    });
    const total = await this.prisma.nhanVien.count();
    return { data: nhanVienList, total };
  }

  async nhanVien(id: number) {
    return this.prisma.nhanVien.findFirst({
      where: { id },
      include: { phong: true, chucVu: true },
    });
  }
  // updateNghiViec(id: number, data: UpdateNghiViecDto) {
  //   return this.prisma.nhanVien.update({
  //     where: { id },
  //     data: data,
  //   });
  // }
}
