import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhuCapService {
  constructor(private prisma: PrismaService) {}

  async phuCaps() {
    return this.prisma.heSoPhuCap.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
