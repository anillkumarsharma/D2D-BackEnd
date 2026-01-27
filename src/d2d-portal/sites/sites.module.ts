import { Module } from '@nestjs/common';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [SitesController],
  providers: [SitesService]
})
export class SitesModule {}
