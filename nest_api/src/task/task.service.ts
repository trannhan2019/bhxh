import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ThongTinBhxhService } from 'src/thong-tin-bhxh/thong-tin-bhxh.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly thongTinBhxhService: ThongTinBhxhService) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleCron() {
    this.logger.log('Running daily job to check DB and send emails');
    const thongTins = await this.thongTinBhxhService.thongTinBhxhGanDenHan();
    for (const thongTin of thongTins) {
      console.log('Da gui email');
    }
  }
}
