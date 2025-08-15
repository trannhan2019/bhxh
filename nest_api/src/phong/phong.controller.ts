import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto } from './phong.dto';

@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Get()
  async phongs() {
    return await this.phongService.phongs();
  }

  @Post()
  async createPhong(@Body() data: CreatePhongDto) {
    return await this.phongService.createPhong(data);
  }

  @Patch(':id')
  async updatePhong(
    @Body() data: CreatePhongDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.phongService.updatePhong(id, data);
  }

  @Get(':id')
  async phong(@Param('id', ParseIntPipe) id: number) {
    return await this.phongService.phong(id);
  }
}
