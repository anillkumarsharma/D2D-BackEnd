import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './create-task.dto';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Visit Site B',
    description: 'Updated task name',
  })
  @IsOptional()
  @IsString()
  taskName?: string;

  @ApiPropertyOptional({
    example: 'Updated task description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'inactive',
    description: 'Updated task status',
    enum: TaskStatus,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
