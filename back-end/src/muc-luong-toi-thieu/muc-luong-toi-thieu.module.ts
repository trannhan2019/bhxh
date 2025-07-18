import { Module } from '@nestjs/common';
import { MucLuongToiThieuController } from './muc-luong-toi-thieu.controller';
import { MucLuongToiThieuService } from './muc-luong-toi-thieu.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MucLuongToiThieuController],
  providers: [MucLuongToiThieuService, PrismaService],
})
export class MucLuongToiThieuModule {}
