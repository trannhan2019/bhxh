import { Module } from '@nestjs/common';
import { TheoDoiBhxhController } from './theo-doi-bhxh.controller';
import { TheoDoiBhxhService } from './theo-doi-bhxh.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TheoDoiBhxhController],
  providers: [TheoDoiBhxhService, PrismaService],
})
export class TheoDoiBhxhModule {}
