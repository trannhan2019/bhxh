import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ThongTinNghiViecService } from './thong-tin-nghi-viec.service';
import { ThongTinNghiViecDto } from './thong-tin-nghi-viec.dto';

@Controller('thong-tin-nghi-viec')
export class ThongTinNghiViecController {
  constructor(
    private readonly thongTinNghiViecService: ThongTinNghiViecService,
  ) {}

  @Get()
  thongTinNghiViecs() {
    // return 'hello';
    return this.thongTinNghiViecService.thongTinNghiViecs();
  }

  @Post('xac-nhan/:id')
  xacNhan(
    @Param('id', ParseIntPipe) id: number,
    @Body() thongTinNghiViec: ThongTinNghiViecDto,
  ) {
    return this.thongTinNghiViecService.xacNhan(id, thongTinNghiViec);
  }
}
