import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TheoDoiBhxhService {
  constructor(private prismaService: PrismaService) {}

  getTheoDoiBhxhs() {
    return this.prismaService.thongTinBHXH.findMany({
      include: {
        nhanVien: {
          include: {
            phong: true,
          },
        },
        bacNgachLuong: {
          include: {
            ngach: true,
          },
        },
        phuCap: true,
        trachNhiem: true,
      },
    });
  }

  getTheoDoiBhxh(id: number) {
    return this.prismaService.thongTinBHXH.findUnique({
      where: { id },
      include: {
        nhanVien: {
          include: {
            phong: true,
          },
        },
        bacNgachLuong: {
          include: {
            ngach: true,
          },
        },
        phuCap: true,
        trachNhiem: true,
      },
    });
  }
}
