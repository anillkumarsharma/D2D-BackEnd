import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '../config/config.module'; // 👈 ADD THIS

@Module({
  imports: [ConfigModule], // 👈 ADD THIS
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
 