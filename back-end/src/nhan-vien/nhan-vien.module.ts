import { Module } from '@nestjs/common';
import { NhanVienController } from './nhan-vien.controller';
import { NhanVienService } from './nhan-vien.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NhanVienController],
  providers: [NhanVienService, PrismaService],
})
export class NhanVienModule {}
