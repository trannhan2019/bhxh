import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MucLuongToiThieuService {
  constructor(private prismaService: PrismaService) {}

  getMucLuongToiThieus() {
    return this.prismaService.mucLuongToiThieuVung.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
