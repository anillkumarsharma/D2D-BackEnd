import { Module } from '@nestjs/common';
import { FeusersService } from './feusers.service';
import { FeusersController } from './feusers.controller';
import { ConfigModule } from 'src/config/config.module';
import { MailApiModule } from 'src/common/mail-api/mail-api.module';

@Module({
  imports: [ConfigModule,MailApiModule], // ⭐ THIS IS THE FIX
  controllers: [FeusersController],
  providers: [FeusersService],
})
export class FeusersModule {}
