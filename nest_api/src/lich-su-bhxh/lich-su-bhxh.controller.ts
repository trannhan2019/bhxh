import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LichSuBhxhService } from './lich-su-bhxh.service';

@Controller('lich-su-bhxh')
export class LichSuBhxhController {
  constructor(private readonly lichSuBhxhService: LichSuBhxhService) {}

  @Get('nhan-vien/:id')
  async lichSuBhxhsTheoNhanVien(@Param('id', ParseIntPipe) id: number) {
    return this.lichSuBhxhService.lichSuBhxhsTheoNhanVien(id);
  }
}
