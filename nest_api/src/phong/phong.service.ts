import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhongService {
  constructor(private prisma: PrismaService) {}

  async phongs() {
    return await this.prisma.phong.findMany({
      orderBy: { soThuTu: 'asc' },
    });
  }
}
