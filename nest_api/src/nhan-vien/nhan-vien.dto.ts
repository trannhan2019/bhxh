import { IsDateString } from 'class-validator';

export class UpdateNghiViecDto {
  @IsDateString()
  daNghiViec: Date;
}
