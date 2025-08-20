import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MucLuongToiThieuService } from './muc-luong-toi-thieu.service';
import { CreateMucLuongToiThieuDto } from './muc-luong-toi-thieu.dto';

@Controller('muc-luong-toi-thieu')
export class MucLuongToiThieuController {
  constructor(
    private readonly mucLuongToiThieuService: MucLuongToiThieuService,
  ) {}

  @Get()
  async mucLuongToiThieus() {
    return await this.mucLuongToiThieuService.mucLuongToiThieus();
  }

  @Get('moi-nhat')
  async mucLuongToiThieuMoiNhat() {
    return await this.mucLuongToiThieuService.mucLuongToiThieuMoiNhat();
  }

  @Post()
  async createMucLuongToiThieu(@Body() data: CreateMucLuongToiThieuDto) {
    return await this.mucLuongToiThieuService.createMucLuongToiThieu(data);
  }

  @Patch(':id')
  async updateMucLuongToiThieu(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateMucLuongToiThieuDto,
  ) {
    return await this.mucLuongToiThieuService.updateMucLuongToiThieu(id, data);
  }

  @Delete(':id')
  async deleteMucLuongToiThieu(@Param('id', ParseIntPipe) id: number) {
    return await this.mucLuongToiThieuService.deleteMucLuongToiThieu(id);
  }
}
