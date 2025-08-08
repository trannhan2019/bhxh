import { Module } from '@nestjs/common';
import { BacLuongService } from './bac-luong.service';
import { BacLuongController } from './bac-luong.controller';

@Module({
  controllers: [BacLuongController],
  providers: [BacLuongService],
})
export class BacLuongModule {}
