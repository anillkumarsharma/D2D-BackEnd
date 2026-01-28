import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateSiteDto {
   @ApiProperty({
    description: 'Unique site code',
    example: 'STE',
  })
  @IsString()
  @IsNotEmpty()
  site_code: string;

   @ApiProperty({
    description: 'Site name',
    example: 'Mumbai Main Site',
  })
  @IsString()
  @IsNotEmpty()
  site_name: string;

   @ApiProperty({
    description: 'Site status',
    example: 'active',
    enum: ['active', 'inactive'],
  })
  @IsString()
  @IsIn(['active', 'inactive'])
  status: string;

  @ApiProperty({
    description: 'User ID or username who created the site',
    example: 'admin_01',
  })
  @IsString()
  @IsNotEmpty()
  created_by: string;
}
