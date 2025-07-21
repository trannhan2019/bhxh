import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhongModule } from './phong/phong.module';
import { ChucVuModule } from './chuc-vu/chuc-vu.module';
import { NhanVienModule } from './nhan-vien/nhan-vien.module';
import { MucLuongToiThieuModule } from './muc-luong-toi-thieu/muc-luong-toi-thieu.module';
import { BacLuongMaxModule } from './bac-luong-max/bac-luong-max.module';
import { HeSoPhuCapModule } from './he-so-phu-cap/he-so-phu-cap.module';
import { NgachLuongModule } from './ngach-luong/ngach-luong.module';
import { TheoDoiBhxhModule } from './theo-doi-bhxh/theo-doi-bhxh.module';
import { BacNgachLuongModule } from './bac-ngach-luong/bac-ngach-luong.module';

@Module({
  imports: [PhongModule, ChucVuModule, NhanVienModule, MucLuongToiThieuModule, BacLuongMaxModule, HeSoPhuCapModule, NgachLuongModule, TheoDoiBhxhModule, BacNgachLuongModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
