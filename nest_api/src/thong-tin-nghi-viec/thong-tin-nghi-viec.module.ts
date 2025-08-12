import { Module } from '@nestjs/common';
import { ThongTinNghiViecService } from './thong-tin-nghi-viec.service';
import { ThongTinNghiViecController } from './thong-tin-nghi-viec.controller';

@Module({
  controllers: [ThongTinNghiViecController],
  providers: [ThongTinNghiViecService],
  exports: [ThongTinNghiViecService],
})
export class ThongTinNghiViecModule {}
