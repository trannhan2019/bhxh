import { Controller } from '@nestjs/common';
import { ThongTinNghiViecService } from './thong-tin-nghi-viec.service';

@Controller('thong-tin-nghi-viec')
export class ThongTinNghiViecController {
  constructor(private readonly thongTinNghiViecService: ThongTinNghiViecService) {}
}
