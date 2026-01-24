import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSiteAssignmentDto {
  @ApiProperty({
    example: 78,
    description: 'Site ID',
  })    
  @IsInt()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty({
    example: 'Anil Sharma',
    description: 'Name of Assigner',
  })
  @IsString()
  @IsNotEmpty()
  assignedBy: string;

  @ApiProperty({
    example: 'd12395bf-aad8-4f3b-9716-fe6a6831b484',
    description: 'User UUID',
  })    
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

export class UnassignSiteDto  {
  @ApiProperty({
    example: 1,
    description: 'id',
  })    
  @IsInt()
  @IsNotEmpty()
  id: number;
}