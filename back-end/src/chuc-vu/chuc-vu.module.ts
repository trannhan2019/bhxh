import { Module } from '@nestjs/common';
import { ChucVuController } from './chuc-vu.controller';
import { ChucVuService } from './chuc-vu.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChucVuController],
  providers: [ChucVuService, PrismaService],
})
export class ChucVuModule {}
