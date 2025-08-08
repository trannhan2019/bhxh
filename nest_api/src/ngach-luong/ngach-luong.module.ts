import { Module } from '@nestjs/common';
import { NgachLuongService } from './ngach-luong.service';
import { NgachLuongController } from './ngach-luong.controller';

@Module({
  controllers: [NgachLuongController],
  providers: [NgachLuongService],
})
export class NgachLuongModule {}
