import { Controller, Get } from '@nestjs/common';
import { BacLuongService } from './bac-luong.service';

@Controller('bac-luong')
export class BacLuongController {
  constructor(private readonly bacLuongService: BacLuongService) {}

  @Get()
  bacLuongs() {
    return this.bacLuongService.bacLuongs();
  }
}
