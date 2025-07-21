import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BacNgachLuongService } from './bac-ngach-luong.service';

@Controller('bac-ngach-luong')
export class BacNgachLuongController {
  constructor(private readonly bacNgachLuongService: BacNgachLuongService) {}

  @Get(':bacLuong/:ngachLuongId')
  getBacLuongTiepTheo(
    @Param('bacLuong', ParseIntPipe) bacLuong: number,
    @Param('ngachLuongId', ParseIntPipe) ngachLuongId: number,
  ) {
    return this.bacNgachLuongService.getBacLuongTiepTheo(
      bacLuong,
      ngachLuongId,
    );
  }
}
