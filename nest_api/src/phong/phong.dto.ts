import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePhongDto {
  @IsString()
  @IsNotEmpty()
  ten: string;

  @IsString()
  @IsNotEmpty()
  tenVietTat: string;

  @IsInt()
  soThuTu: number;
}
