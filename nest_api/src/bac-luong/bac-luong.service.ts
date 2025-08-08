import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BacLuongService {
  constructor(private prisma: PrismaService) {}

  bacLuongs() {
    return this.prisma.bacLuong.findMany();
  }
}
