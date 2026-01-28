import { Module } from '@nestjs/common';
import { FeTaskAssignmentController } from './fe-task-assignment.controller';
import { FeTaskAssignmentService } from './fe-task-assignment.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [FeTaskAssignmentController],
  providers: [FeTaskAssignmentService]
})
export class FeTaskAssignmentModule {}
