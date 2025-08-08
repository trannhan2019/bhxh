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
}
