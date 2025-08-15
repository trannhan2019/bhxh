import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePhongDto } from './phong.dto';

@Injectable()
export class PhongService {
  constructor(private prisma: PrismaService) {}

  async phongs() {
    return await this.prisma.phong.findMany({
      orderBy: { soThuTu: 'asc' },
    });
  }

  async phong(id: number) {
    return await this.prisma.phong.findUnique({ where: { id } });
  }

  async createPhong(data: CreatePhongDto) {
    return this.prisma.phong.create({ data });
  }

  async updatePhong(id: number, data: CreatePhongDto) {
    return this.prisma.phong.update({
      where: { id },
      data,
    });
  }
}
