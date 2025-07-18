import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HeSoPhuCapService {
  constructor(private prismaService: PrismaService) {}
  async getHeSoPhuCaps() {
    const heSoPhuCap = await this.prismaService.heSoPhuCap.findMany({
      orderBy: { id: 'asc' },
    });
    const heSoTrachNhiem = await this.prismaService.heSoTrachNhiem.findMany({
      orderBy: { id: 'asc' },
    });
    return { heSoPhuCap, heSoTrachNhiem };
  }
}
