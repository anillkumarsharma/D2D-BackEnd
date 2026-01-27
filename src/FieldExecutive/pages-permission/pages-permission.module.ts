import { Module } from '@nestjs/common';
import { PagesPermissionController } from './pages-permission.controller';
import { PagesPermissionService } from './pages-permission.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [PagesPermissionController],
  providers: [PagesPermissionService]
})
export class PagesPermissionModule {}
