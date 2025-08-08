import { Controller, Get } from '@nestjs/common';
import { MucLuongToiThieuService } from './muc-luong-toi-thieu.service';

@Controller('muc-luong-toi-thieu')
export class MucLuongToiThieuController {
  constructor(
    private readonly mucLuongToiThieuService: MucLuongToiThieuService,
  ) {}

  @Get()
  async mucLuongToiThieu() {
    return await this.mucLuongToiThieuService.mucLuongToiThieu();
  }
}
