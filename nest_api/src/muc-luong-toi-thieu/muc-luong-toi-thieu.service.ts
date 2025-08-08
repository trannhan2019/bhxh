import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MucLuongToiThieuService {
  constructor(private prisma: PrismaService) {}

  async mucLuongToiThieu() {
    return await this.prisma.mucLuongToiThieuVung.findFirstOrThrow({
      orderBy: { thoiGianApdung: 'desc' },
    });
  }
}
