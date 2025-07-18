import { Module } from '@nestjs/common';
import { PhongController } from './phong.controller';
import { PhongService } from './phong.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PhongController],
  providers: [PrismaService, PhongService],
})
export class PhongModule {}
