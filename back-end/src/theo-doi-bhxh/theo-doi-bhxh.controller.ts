import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TheoDoiBhxhService } from './theo-doi-bhxh.service';

@Controller('theo-doi-bhxh')
export class TheoDoiBhxhController {
  constructor(private readonly theoDoiBhxhService: TheoDoiBhxhService) {}

  @Get()
  getTheoDoiBhxhs() {
    return this.theoDoiBhxhService.getTheoDoiBhxhs();
  }

  @Get(':id')
  getTheoDoiBhxh(@Param('id', ParseIntPipe) id: number) {
    return this.theoDoiBhxhService.getTheoDoiBhxh(id);
  }
}
