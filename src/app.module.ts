import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigModule } from './config/config.module';
import { TasksModule } from './FieldExecutive/tasks/tasks.module';
import { SiteAssignmentModule } from './FieldExecutive/site-assignment/site-assignment.module';
import { BranchesModule } from './EmployeeManagement/branches/branches.module';
import { FeusersModule } from './FieldExecutive/feusers/feusers.module';
import { MailApiModule } from './common/mail-api/mail-api.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConfigModule,
    TasksModule,
    SiteAssignmentModule,
    BranchesModule,
    FeusersModule,
    MailApiModule

  ],
})
export class AppModule { }
