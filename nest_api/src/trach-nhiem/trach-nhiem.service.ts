import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrachNhiemService {
  constructor(private prisma: PrismaService) {}

  trachNhiems() {
    return this.prisma.heSoTrachNhiem.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
