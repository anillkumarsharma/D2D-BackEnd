import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBranchDto {
  @ApiProperty({
    example: 'Delhi Head Office',
    description: 'Branch name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'DL-HO-001',
    description: 'Unique branch code',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'Connaught Place, New Delhi',
    description: 'Branch address',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({
    example: 28.6139,
    description: 'Latitude of branch location',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional({
    example: 77.209,
    description: 'Longitude of branch location',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lng?: number;
}
