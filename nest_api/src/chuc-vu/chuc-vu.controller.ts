import { Controller, Get } from '@nestjs/common';
import { ChucVuService } from './chuc-vu.service';

@Controller('chuc-vu')
export class ChucVuController {
  constructor(private readonly chucVuService: ChucVuService) {}

  @Get()
  chucVus() {
    return this.chucVuService.chucVus();
  }
}
