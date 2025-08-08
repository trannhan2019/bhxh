import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChucVuService {
  constructor(private prisma: PrismaService) {}

  async chucVus() {
    return await this.prisma.chucVu.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
