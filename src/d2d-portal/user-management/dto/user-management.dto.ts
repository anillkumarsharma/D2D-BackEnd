import {IsString,IsEmail,IsBoolean,IsIn,IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({
    example: false,
    description: 'User is super admin or not',
  })
  @IsBoolean()
  @IsNotEmpty()
  isSuperadmin: boolean;

  @ApiProperty({
    example: 'Anil Sharma',
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'anil@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'active',
    enum: ['active', 'inactive'],
    description: 'User status',
  })
  @IsIn(['active', 'inactive'])
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: 'admin_123',
    description: 'User ID who created this user',
  })
  @IsString()
  @IsNotEmpty()
  createdBy: string;


  @ApiProperty({
    example: 'internal',
    enum: ['internal', 'external'],
    description: 'Type of user',
  })
  @IsIn(['internal', 'external'])
  @IsNotEmpty()
  userType: string;

  @ApiProperty({
    example: 'EMP001',
    description: 'Employee code',
    required: false,
  })
  @IsString()
  @IsOptional()
  empCode?: string;
}


export class UpdateUserDto {
    @ApiPropertyOptional({
    example: false,
    description: 'User is super admin or not',
  })
  @IsBoolean()
  @IsOptional()
  isSuperadmin?: boolean;

  @ApiPropertyOptional({
    example: 'Anil Sharma',
    description: 'Full name of the user',
  })
  @IsString()
 @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'anil@example.com',
    description: 'User email address',
  })
  @IsEmail()
 @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: 'active',
    enum: ['active', 'inactive'],
    description: 'User status',
  })
  @IsIn(['active', 'inactive'])
  @IsOptional()
  status?: string;

  
  @ApiPropertyOptional({
    example: 'internal',
    enum: ['internal', 'external'],
    description: 'Type of user',
  })
  @IsIn(['internal', 'external'])
 @IsOptional()
  userType?: string;

  @ApiPropertyOptional({
    example: 'EMP001',
    description: 'Employee code',
    required: false,
  })
  @IsString()
  @IsOptional()
  empCode?: string;
}
