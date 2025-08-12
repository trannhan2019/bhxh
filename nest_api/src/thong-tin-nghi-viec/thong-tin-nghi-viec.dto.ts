import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class ThongTinNghiViecDto {
  @IsInt()
  nhanVienId: number;

  @IsDateString()
  thoiGianKetThuc: Date;

  @IsString()
  @IsOptional()
  thongTinKhac: string | null;
}
