import { Controller, Get } from '@nestjs/common';
import { PhongService } from './phong.service';

@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Get()
  async phongs() {
    return await this.phongService.phongs();
  }
}
