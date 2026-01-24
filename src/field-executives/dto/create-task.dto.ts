import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Visit Site A',
    description: 'Name of the task',
  })
  @IsString()
  @IsNotEmpty()
  taskName: string;

  @ApiProperty({
    example: 'Check bin status and submit report',
    description: 'Task description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
