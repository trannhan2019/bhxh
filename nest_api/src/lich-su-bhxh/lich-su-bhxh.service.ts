import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLichSuBhxhDto } from './lich-su-bhxh.dto';

@Injectable()
export class LichSuBhxhService {
  constructor(private prisma: PrismaService) {}

  addLichSuBhxh(data: CreateLichSuBhxhDto) {
    return this.prisma.lichSuBhxh.create({ data });
  }

  lichSuBhxhsTheoNhanVien(id: number) {
    return this.prisma.lichSuBhxh.findMany({
      where: { nhanVienId: id },
      include: {
        nhanVien: true,
        bacLuong: { include: { ngachLuong: true } },
        phuCap: true,
        trachNhiem: true,
        mucLuongToiThieuVung: true,
      },
      orderBy: { ngayApDung: 'desc' },
    });
  }
}
