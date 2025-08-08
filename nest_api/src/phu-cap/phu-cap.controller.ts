import { Controller, Get } from '@nestjs/common';
import { PhuCapService } from './phu-cap.service';

@Controller('phu-cap')
export class PhuCapController {
  constructor(private readonly phuCapService: PhuCapService) {}

  @Get()
  async phuCaps() {
    return await this.phuCapService.phuCaps();
  }
}
