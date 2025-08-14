import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ThongTinBhxhService } from './thong-tin-bhxh.service';
import { ReportService } from 'src/report/report.service';
import { Response } from 'express';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('thong-tin-bhxh')
export class ThongTinBhxhController {
  constructor(
    private readonly thongTinBhxhService: ThongTinBhxhService,
    private readonly reportService: ReportService,
    private readonly mailService: MailerService,
  ) {}

  @Get()
  thongTinBhxhs() {
    return this.thongTinBhxhService.thongTinBhxhs();
  }

  @Get('/notification')
  async getNotification() {
    const thongTins = await this.thongTinBhxhService.thongTinBhxhGanDenHan();
    return thongTins;
  }

  @Get('report/:id')
  async exportThongTinBhxhToExcel(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    const thongTin = await this.thongTinBhxhService.thongTinBhxh(id);
    if (!thongTin) {
      throw new Error('Không có thông tin Thông tin');
    }
    const buffer = await this.reportService.exportThongTinBhxhToExcel(thongTin);

    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    response.setHeader(
      'Content-Disposition',
      'attachment; filename="bhxh.xlsx"',
    );
    return response.send(buffer);
  }

  @Get('xac-nhan/:id')
  async xacNhan(@Param('id', ParseIntPipe) id: number) {
    return this.thongTinBhxhService.xacNhanNangBac(id);
  }

  //dynamic route last router
  @Get(':id')
  async thongTinBhxh(@Param('id', ParseIntPipe) id: number) {
    const thongTin = await this.thongTinBhxhService.thongTinBhxh(id);
    if (!thongTin) {
      throw new Error('Not found');
    }
    return this.thongTinBhxhService.thongTinBhxh(id);
  }
}
