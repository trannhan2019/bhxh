import { Module } from '@nestjs/common';
import { PhuCapService } from './phu-cap.service';
import { PhuCapController } from './phu-cap.controller';

@Module({
  controllers: [PhuCapController],
  providers: [PhuCapService],
})
export class PhuCapModule {}
