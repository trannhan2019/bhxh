import { Controller, Get } from '@nestjs/common';
import { HeSoPhuCapService } from './he-so-phu-cap.service';

@Controller('he-so-phu-cap')
export class HeSoPhuCapController {
  constructor(private readonly heSoPhuCapService: HeSoPhuCapService) {}

  @Get()
  getHeSoPhuCaps() {
    return this.heSoPhuCapService.getHeSoPhuCaps();
  }
}
