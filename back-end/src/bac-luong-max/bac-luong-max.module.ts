import { Module } from '@nestjs/common';
import { BacLuongMaxController } from './bac-luong-max.controller';
import { BacLuongMaxService } from './bac-luong-max.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BacLuongMaxController],
  providers: [BacLuongMaxService, PrismaService],
})
export class BacLuongMaxModule {}
