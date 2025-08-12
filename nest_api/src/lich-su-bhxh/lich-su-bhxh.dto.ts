import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLichSuBhxhDto {
  @IsInt()
  nhanVienId: number;

  @IsInt()
  bacLuongId: number;

  @IsOptional()
  @IsInt()
  phuCapId: number | null;

  @IsOptional()
  @IsInt()
  trachNhiemId: number | null;

  @IsInt()
  mucLuongToiThieuVungId: number;

  @IsOptional()
  @IsDateString()
  ngayApDung: Date | null; // ISO date format

  @IsOptional()
  @IsString()
  thongTinQD: string | null;
}
