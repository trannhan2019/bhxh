import { Module } from '@nestjs/common';
import { ThongTinBhxhService } from './thong-tin-bhxh.service';
import { ThongTinBhxhController } from './thong-tin-bhxh.controller';
import { ReportModule } from 'src/report/report.module';

@Module({
  imports: [ReportModule],
  controllers: [ThongTinBhxhController],
  providers: [ThongTinBhxhService],
  exports: [ThongTinBhxhService],
})
export class ThongTinBhxhModule {}
