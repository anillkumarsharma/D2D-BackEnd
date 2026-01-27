import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TaskStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

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

  @ApiProperty({
    example: 'active',
    description: 'Task status',
    enum: TaskStatus,
  })
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
