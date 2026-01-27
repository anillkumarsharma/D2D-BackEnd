import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBranchDto {
  @ApiPropertyOptional({
    example: 'Delhi Regional Office',
    description: 'Updated branch name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'DL-RO-002',
    description: 'Updated branch code',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    example: 'Karol Bagh, New Delhi',
    description: 'Updated branch address',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: 28.65,
    description: 'Updated latitude',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional({
    example: 77.19,
    description: 'Updated longitude',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lng?: number;


@ApiPropertyOptional()
@IsOptional()
id?: number;

@ApiPropertyOptional()
@IsOptional()
created_at?: string;
}