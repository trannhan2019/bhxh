import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NgachLuongService {
  constructor(private prismaService: PrismaService) {}

  getNgachLuongs() {
    return this.prismaService.ngachLuong.findMany({
      orderBy: { id: 'asc' },
      include: {
        bacNgach: true,
      },
    });
  }
}
