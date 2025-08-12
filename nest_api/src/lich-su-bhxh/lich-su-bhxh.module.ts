import { Module } from '@nestjs/common';
import { LichSuBhxhService } from './lich-su-bhxh.service';
import { LichSuBhxhController } from './lich-su-bhxh.controller';

@Module({
  controllers: [LichSuBhxhController],
  providers: [LichSuBhxhService],
  exports: [LichSuBhxhService],
})
export class LichSuBhxhModule {}
