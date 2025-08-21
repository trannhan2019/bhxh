import { Type } from 'class-transformer';
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
  @Type(() => Date)
  @IsNotEmpty()
  thoiGianApdung: Date;

  @IsOptional()
  @IsString()
  canCuPhapLy: string;
}
