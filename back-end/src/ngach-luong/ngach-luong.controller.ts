import { Controller, Get } from '@nestjs/common';
import { NgachLuongService } from './ngach-luong.service';

@Controller('ngach-luong')
export class NgachLuongController {
  constructor(private readonly ngachLuongService: NgachLuongService) {}

  @Get()
  getNgachLuongs() {
    return this.ngachLuongService.getNgachLuongs();
  }
}
