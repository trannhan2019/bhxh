import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNhanVienDto } from './nhan-vien.dto';

@Injectable()
export class NhanVienService {
  constructor(private prisma: PrismaService) {}

  async nhanViens({ page = 1, pageSize = 20, search = '' }) {
    const nhanVienList = await this.prisma.nhanVien.findMany({
      where: { ten: { contains: search } },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { soThuTu: 'asc' },
      include: { chucVu: true, phong: true },
    });
    const total = await this.prisma.nhanVien.count({
      where: { ten: { contains: search } },
    });
    return { data: nhanVienList, total };
  }

  async nhanVien(id: number) {
    return this.prisma.nhanVien.findFirst({
      where: { id },
      include: { phong: true, chucVu: true },
    });
  }

  async createNhanVien(data: CreateNhanVienDto) {
    return this.prisma.nhanVien.create({ data });
  }

  async updateNhanVien(id: number, data: CreateNhanVienDto) {
    return this.prisma.nhanVien.update({
      where: { id },
      data: data,
    });
  }

  async deleteNhanVien(id: number) {
    return this.prisma.nhanVien.delete({ where: { id } });
  }
  // updateNghiViec(id: number, data: UpdateNghiViecDto) {
  //   return this.prisma.nhanVien.update({
  //     where: { id },
  //     data: data,
  //   });
  // }
}
