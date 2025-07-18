import { Controller, Get } from '@nestjs/common';
import { MucLuongToiThieuService } from './muc-luong-toi-thieu.service';

@Controller('muc-luong-toi-thieu')
export class MucLuongToiThieuController {
  constructor(
    private readonly mucLuongToiThieuService: MucLuongToiThieuService,
  ) {}

  @Get()
  getMucLuongToiThieus() {
    return this.mucLuongToiThieuService.getMucLuongToiThieus();
  }
}
