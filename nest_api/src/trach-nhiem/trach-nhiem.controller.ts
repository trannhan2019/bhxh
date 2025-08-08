import { Controller, Get } from '@nestjs/common';
import { TrachNhiemService } from './trach-nhiem.service';

@Controller('trach-nhiem')
export class TrachNhiemController {
  constructor(private readonly trachNhiemService: TrachNhiemService) {}

  @Get()
  trachNhiems() {
    return this.trachNhiemService.trachNhiems();
  }
}
