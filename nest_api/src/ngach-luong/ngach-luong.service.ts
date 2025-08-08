import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NgachLuongService {
  constructor(private prisma: PrismaService) {}

  ngachLuongs() {
    return this.prisma.ngachLuong.findMany({
      orderBy: { id: 'asc' },
      include: { bacLuongs: true },
    });
  }
}
