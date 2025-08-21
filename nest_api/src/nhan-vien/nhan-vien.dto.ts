import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateNghiViecDto {
  @IsDateString()
  daNghiViec: Date;
}

export class CreateNhanVienDto {
  @IsString()
  @IsNotEmpty()
  ten: string;

  @IsInt()
  @IsNotEmpty()
  phongId: number;

  @IsInt()
  @IsNotEmpty()
  chucVuId: number;

  @IsInt()
  @IsNotEmpty()
  soThuTu: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean = true;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  daNghiViec?: Date;

  @IsBoolean()
  @IsNotEmpty()
  isVhsc: boolean = false;
}
