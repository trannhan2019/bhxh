import { Module } from '@nestjs/common';
import { TrachNhiemService } from './trach-nhiem.service';
import { TrachNhiemController } from './trach-nhiem.controller';

@Module({
  controllers: [TrachNhiemController],
  providers: [TrachNhiemService],
})
export class TrachNhiemModule {}
