import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
