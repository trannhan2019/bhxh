import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { ThongTinBhxhModule } from 'src/thong-tin-bhxh/thong-tin-bhxh.module';
import { EMailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [ThongTinBhxhModule, EMailerModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
