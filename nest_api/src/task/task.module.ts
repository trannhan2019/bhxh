import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { ThongTinBhxhModule } from 'src/thong-tin-bhxh/thong-tin-bhxh.module';

@Module({
  imports: [ThongTinBhxhModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
