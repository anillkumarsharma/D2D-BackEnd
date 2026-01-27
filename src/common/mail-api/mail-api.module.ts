import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MailApiService } from './mail-api.service';
import { MailApiController } from './mail-api.controller';

@Module({
  imports: [HttpModule],
  controllers: [MailApiController],
  providers: [MailApiService],
  exports: [MailApiService],
})
export class MailApiModule {}
