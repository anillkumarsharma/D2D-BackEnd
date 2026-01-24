import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
}
