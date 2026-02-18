import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigModule } from './config/config.module';
import { TasksModule } from './FieldExecutive/tasks/tasks.module';
import { SiteAssignmentModule } from './FieldExecutive/site-assignment/site-assignment.module';
import { PagesPermissionModule } from './FieldExecutive/pages-permission/pages-permission.module';
import { BranchesModule } from './EmployeeManagement/branches/branches.module';
import { FeusersModule } from './FieldExecutive/feusers/feusers.module';
import { MailApiModule } from './common/mail-api/mail-api.module';
import { SitesModule } from './d2d-portal/sites/sites.module';
import { FeTaskAssignmentModule } from './FieldExecutive/fe-task-assignment/fe-task-assignment.module';
import { FilesModule } from './d2d-portal/files/files.module';
import { UserManagementModule } from './d2d-portal/user-management/user-management.module';
import { DepartmentModule } from './EmployeeManagement/department/department.module';
import { DesignationModule } from './EmployeeManagement/designation/designation.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConfigModule,
    TasksModule,
    SiteAssignmentModule,
    PagesPermissionModule,
    BranchesModule,
    FeusersModule,
    MailApiModule,
    SitesModule,
    FeTaskAssignmentModule,
    FilesModule,
    UserManagementModule,
    DepartmentModule,
    DesignationModule,
  ],
})
export class AppModule {}
