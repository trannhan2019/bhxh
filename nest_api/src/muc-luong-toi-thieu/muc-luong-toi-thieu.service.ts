import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMucLuongToiThieuDto } from './muc-luong-toi-thieu.dto';

@Injectable()
export class MucLuongToiThieuService {
  constructor(private prisma: PrismaService) {}

  async mucLuongToiThieus() {
    return await this.prisma.mucLuongToiThieuVung.findMany({
      orderBy: { thoiGianApdung: 'desc' },
    });
  }

  async mucLuongToiThieu(id: number) {
    return await this.prisma.mucLuongToiThieuVung.findUnique({
      where: { id },
    });
  }
  async mucLuongToiThieuMoiNhat() {
    return await this.prisma.mucLuongToiThieuVung.findFirstOrThrow({
      orderBy: { thoiGianApdung: 'desc' },
    });
  }

  async createMucLuongToiThieu(data: CreateMucLuongToiThieuDto) {
    return await this.prisma.mucLuongToiThieuVung.create({ data });
  }

  async updateMucLuongToiThieu(id: number, data: CreateMucLuongToiThieuDto) {
    return await this.prisma.mucLuongToiThieuVung.update({
      where: { id },
      data,
    });
  }

  async deleteMucLuongToiThieu(id: number) {
    return await this.prisma.mucLuongToiThieuVung.delete({ where: { id } });
  }
}
