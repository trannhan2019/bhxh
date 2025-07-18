import { Module } from '@nestjs/common';
import { NgachLuongController } from './ngach-luong.controller';
import { NgachLuongService } from './ngach-luong.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NgachLuongController],
  providers: [NgachLuongService, PrismaService],
})
export class NgachLuongModule {}
