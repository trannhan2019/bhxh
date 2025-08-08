import { Module } from '@nestjs/common';
import { MucLuongToiThieuService } from './muc-luong-toi-thieu.service';
import { MucLuongToiThieuController } from './muc-luong-toi-thieu.controller';

@Module({
  controllers: [MucLuongToiThieuController],
  providers: [MucLuongToiThieuService],
})
export class MucLuongToiThieuModule {}
