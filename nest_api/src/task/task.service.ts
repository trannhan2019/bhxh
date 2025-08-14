import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from 'src/mailer/email.service';
import { ThongTinBhxhService } from 'src/thong-tin-bhxh/thong-tin-bhxh.service';
import dayjs from 'dayjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  private DAYS_BETWEEN_EMAILS = 5;

  constructor(
    private readonly thongTinBhxhService: ThongTinBhxhService,
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async handleCron() {
    this.logger.log('Running scheduled job...');
    const now = dayjs();
    const thongTins = await this.thongTinBhxhService.thongTinBhxhGanDenHan();
    if (thongTins.length === 0) return false;
    for (const thongTin of thongTins) {
      const canSendEmail =
        !thongTin.lastEmailSentAt ||
        now.diff(thongTin.lastEmailSentAt, 'day') > this.DAYS_BETWEEN_EMAILS;
      if (canSendEmail) {
        // const html = `
        // <!doctype html>
        //     <html lang="vn">
        //       <head>
        //         <meta charset="UTF-8" />
        //         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        //         <title>Document</title>
        //       </head>
        //       <body>
        //         <p>
        //           Chúng tôi xin thông báo rằng nhân viên
        //           <strong>${thongTin.nhanVien.ten}</strong> thuộc ngạch
        //           <strong>${thongTin.ngachLuong.chucDanh}</strong>, bậc
        //           <strong>${thongTin.bacLuong.bac}</strong> sắp đến kỳ nâng bậc.
        //         </p>
        //         <p>
        //           Ngày áp dụng thông tin BHXH hiện tại:
        //           <strong>${thongTin.ngayApDung}</strong>
        //         </p>
        //         <p>
        //           Ngày dự kiến nâng bậc tiếp theo:

        //         </p>
        //         <p>Trân trọng,</p>
        //         <p>Hệ thống quản lý</p>
        //       </body>
        //     </html>
        // `;
        const html = `
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
          Ngày dự kiến nâng bậc tiếp theo: ${thongTin.ngayNangBacNext}
        
        </p>
        <p>Trân trọng,</p>
        <p>Hệ thống quản lý</p>`;
        await this.emailService.sendEmailBhxh(html);
        //cap nhat ngay gui email
        await this.prisma.thongTinBhxh.update({
          where: { id: thongTin.id },
          data: { lastEmailSentAt: now.toDate() },
        });

        this.logger.log('Test email sent via Mailtrap');
      }
    }
  }
}
