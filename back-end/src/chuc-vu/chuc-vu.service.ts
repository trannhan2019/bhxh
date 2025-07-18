import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChucVuService {
  constructor(private prismaService: PrismaService) {}
  getChucVus() {
    return this.prismaService.chucVu.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
