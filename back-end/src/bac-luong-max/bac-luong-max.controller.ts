import { Controller, Get } from '@nestjs/common';
import { BacLuongMaxService } from './bac-luong-max.service';

@Controller('bac-luong-max')
export class BacLuongMaxController {
  constructor(private readonly bacLuongMaxService: BacLuongMaxService) {}

  @Get()
  getBacLuongMaxs() {
    return this.bacLuongMaxService.getBacLuongMaxs();
  }
}
