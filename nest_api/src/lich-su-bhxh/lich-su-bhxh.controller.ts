import { Controller } from '@nestjs/common';
import { LichSuBhxhService } from './lich-su-bhxh.service';

@Controller('lich-su-bhxh')
export class LichSuBhxhController {
  constructor(private readonly lichSuBhxhService: LichSuBhxhService) {}
}
