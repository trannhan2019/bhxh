import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BacLuongMaxService {
  constructor(private prismaService: PrismaService) {}

  getBacLuongMaxs() {
    return this.prismaService.bacLuongMax.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
