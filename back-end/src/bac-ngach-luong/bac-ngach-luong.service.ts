import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BacNgachLuongService {
  constructor(private prismaService: PrismaService) {}

  getBacLuongTiepTheo(bacLuong: number, ngachLuongId: number) {
    return this.prismaService.bacNgachLuong.findFirst({
      where: {
        AND: [
          {
            ngachId: {
              equals: ngachLuongId,
            },
          },
          {
            bac: {
              equals: bacLuong + 1,
            },
          },
        ],
      },
      include: {
        ngach: true,
      },
    });
  }
}
