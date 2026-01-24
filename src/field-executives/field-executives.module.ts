import { Module } from '@nestjs/common';
import { FieldExecutivesController } from './field-executives.controller';
import { FieldExecutivesService } from './field-executives.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports:[ConfigModule],
  controllers: [FieldExecutivesController],
  providers: [FieldExecutivesService]
})
export class FieldExecutivesModule {}
