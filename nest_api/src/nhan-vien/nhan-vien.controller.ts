import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { NhanVienService } from './nhan-vien.service';

@Controller('nhan-vien')
export class NhanVienController {
  constructor(private readonly nhanVienService: NhanVienService) {}

  @Get()
  nhanViens(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    return this.nhanVienService.nhanViens({ page, pageSize });
  }

  @Get(':id')
  nhanVien(@Param('id', ParseIntPipe) id: number) {
    return this.nhanVienService.nhanVien(id);
  }
}
