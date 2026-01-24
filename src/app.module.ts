import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigModule } from './config/config.module';
import { TasksModule } from './FieldExecutives/tasks/tasks.module';
import { SiteAssignmentModule } from './FieldExecutives/site-assignment/site-assignment.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConfigModule,
    TasksModule,
    SiteAssignmentModule
  ],
})
export class AppModule {}
