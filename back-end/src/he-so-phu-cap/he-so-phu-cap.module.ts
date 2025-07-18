import { Module } from '@nestjs/common';
import { HeSoPhuCapController } from './he-so-phu-cap.controller';
import { HeSoPhuCapService } from './he-so-phu-cap.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [HeSoPhuCapController],
  providers: [HeSoPhuCapService, PrismaService],
})
export class HeSoPhuCapModule {}
