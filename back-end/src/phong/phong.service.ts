import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhongService {
  constructor(private prismaService: PrismaService) {}

  async getPhongs() {
    return await this.prismaService.phong.findMany({
      orderBy: { soThuTu: 'asc' },
    });
  }
}
