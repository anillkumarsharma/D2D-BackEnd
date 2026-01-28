import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateSiteDto {
  @ApiPropertyOptional({
    description: 'Site name',
    example: 'Mumbai Main Site',
  })
  @IsString()
  @IsOptional()
  site_name?: string;

  @ApiPropertyOptional({
    description: 'Site status',
    example: 'active',
    enum: ['active', 'inactive'],
  })
  @IsString()
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;

  @ApiPropertyOptional({
    description: 'Firebase database path for the site',
    example: '/sites/mumbai_main',
  })
  @IsString()
  @IsOptional()
  firebase_db_path?: string;
}
