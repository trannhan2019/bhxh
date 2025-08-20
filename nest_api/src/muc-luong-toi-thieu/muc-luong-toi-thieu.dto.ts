import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMucLuongToiThieuDto {
  @IsInt()
  @IsNotEmpty()
  mucLuong: number;

  @IsDate()
  @IsNotEmpty()
  thoiGianApdung: Date;

  @IsOptional()
  @IsString()
  canCuPhapLy: string;
}
