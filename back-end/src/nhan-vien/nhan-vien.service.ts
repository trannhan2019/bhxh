import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NhanVienService {
  constructor(private readonly prismaService: PrismaService) {}

  async getNhanViens({ page, pageSize }) {
    const pageParam = Number(page) || 1;
    const pageSizeParam = Number(pageSize) || 10;
    const nhanViens = await this.prismaService.nhanVien.findMany({
      skip: (pageParam - 1) * pageSizeParam,
      take: pageSizeParam,
      orderBy: {
        soThuTu: 'asc',
      },
      include: {
        phong: true,
        chucVu: true,
      },
    });
    // Lấy tổng số bản ghi để tính toán phân trang
    const total = await this.prismaService.nhanVien.count();
    return { data: nhanViens, total };
  }
}
