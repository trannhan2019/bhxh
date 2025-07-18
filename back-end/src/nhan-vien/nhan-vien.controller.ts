import { Controller, Get, Query } from '@nestjs/common';
import { NhanVienService } from './nhan-vien.service';

@Controller('nhan-vien')
export class NhanVienController {
  constructor(private readonly nhanVienService: NhanVienService) {}

  @Get()
  getNhanViens(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.nhanVienService.getNhanViens({ page, pageSize });
  }
}
