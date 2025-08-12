import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhongModule } from './phong/phong.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChucVuModule } from './chuc-vu/chuc-vu.module';
import { NhanVienModule } from './nhan-vien/nhan-vien.module';
import { MucLuongToiThieuModule } from './muc-luong-toi-thieu/muc-luong-toi-thieu.module';
import { PhuCapModule } from './phu-cap/phu-cap.module';
import { TrachNhiemModule } from './trach-nhiem/trach-nhiem.module';
import { NgachLuongModule } from './ngach-luong/ngach-luong.module';
import { BacLuongModule } from './bac-luong/bac-luong.module';
import { ThongTinBhxhModule } from './thong-tin-bhxh/thong-tin-bhxh.module';
import { ReportModule } from './report/report.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { LichSuBhxhModule } from './lich-su-bhxh/lich-su-bhxh.module';
import { ThongTinNghiViecModule } from './thong-tin-nghi-viec/thong-tin-nghi-viec.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    PhongModule,
    ChucVuModule,
    NhanVienModule,
    MucLuongToiThieuModule,
    PhuCapModule,
    TrachNhiemModule,
    NgachLuongModule,
    BacLuongModule,
    ThongTinBhxhModule,
    ReportModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT as unknown as number,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    LichSuBhxhModule,
    ThongTinNghiViecModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
