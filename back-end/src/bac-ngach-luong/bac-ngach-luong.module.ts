import { Module } from '@nestjs/common';
import { BacNgachLuongController } from './bac-ngach-luong.controller';
import { BacNgachLuongService } from './bac-ngach-luong.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BacNgachLuongController],
  providers: [BacNgachLuongService, PrismaService],
})
export class BacNgachLuongModule {}
