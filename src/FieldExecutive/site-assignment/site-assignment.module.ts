import { Module } from '@nestjs/common';
import { SiteAssignmentController } from './site-assignment.controller';
import { SiteAssignmentService } from './site-assignment.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [SiteAssignmentController],
  providers: [SiteAssignmentService]
})
export class SiteAssignmentModule {}
