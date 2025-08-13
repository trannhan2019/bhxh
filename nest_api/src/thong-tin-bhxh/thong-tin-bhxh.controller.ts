import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ThongTinBhxhService } from './thong-tin-bhxh.service';
import dayjs from 'dayjs';
import { ReportService } from 'src/report/report.service';
import { Response } from 'express';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('thong-tin-bhxh')
export class ThongTinBhxhController {
  private DAYS_BETWEEN_EMAILS = 5;
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
  async sendNotification() {
    const now = dayjs();
    const thongTins = await this.thongTinBhxhService.thongTinBhxhGanDenHan();
    if (thongTins.length === 0) return [];
    for (const thongTin of thongTins) {
      const canSendEmail =
        !thongTin.lastEmailSentAt ||
        now.diff(thongTin.lastEmailSentAt, 'day') > this.DAYS_BETWEEN_EMAILS;
      if (canSendEmail) {
        const html = `
        <!doctype html>
            <html lang="vn">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
              </head>
              <body>
                <p>
                  Chúng tôi xin thông báo rằng nhân viên
                  <strong>${thongTin.nhanVien.ten}</strong> thuộc ngạch
                  <strong>${thongTin.ngachLuong.chucDanh}</strong>, bậc
                  <strong>${thongTin.bacLuong.bac}</strong> sắp đến kỳ nâng bậc.
                </p>
                <p>
                  Ngày áp dụng thông tin BHXH hiện tại:
                  <strong>${thongTin.ngayApDung}</strong>
                </p>
                <p>
                  Ngày dự kiến nâng bậc tiếp theo:
                  
                </p>
                <p>Trân trọng,</p>
                <p>Hệ thống quản lý</p>
              </body>
            </html>
        `;
        // this.mailService.sendMail({
        //   from: 'Lương BHXH <phongtochuchanhchinh.sba@gmail.com>',
        //   to: 'trannhan.s3@gmail.com',
        //   subject: 'Thông báo nâng lương BHXH gần đến hạn',
        //   text: html,
        // });
      }
    }
    return thongTins;
  }
  // @Get('report/:id')
  // test() {
  //   return 'test';
  // }
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
    return this.thongTinBhxhService.xacNhan(id);
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
