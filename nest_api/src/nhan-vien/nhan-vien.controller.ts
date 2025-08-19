import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NhanVienService } from './nhan-vien.service';
import { CreateNhanVienDto } from './nhan-vien.dto';

@Controller('nhan-vien')
export class NhanVienController {
  constructor(private readonly nhanVienService: NhanVienService) {}

  @Get()
  nhanViens(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('search') search: string,
  ) {
    return this.nhanVienService.nhanViens({ page, pageSize, search });
  }

  @Post()
  createNhanVien(@Body() data: CreateNhanVienDto) {
    return this.nhanVienService.createNhanVien(data);
  }

  @Patch(':id')
  updateNhanVien(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateNhanVienDto,
  ) {
    return this.nhanVienService.updateNhanVien(id, data);
  }

  @Delete(':id')
  deleteNhanVien(@Param('id', ParseIntPipe) id: number) {
    return this.nhanVienService.deleteNhanVien(id);
  }

  @Get(':id')
  nhanVien(@Param('id', ParseIntPipe) id: number) {
    return this.nhanVienService.nhanVien(id);
  }
}
