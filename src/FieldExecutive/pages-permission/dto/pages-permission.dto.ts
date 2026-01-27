import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePagesPermissionsDto{
  @ApiProperty({
    example: 'd12395bf-aad8-4f3b-9716-fe6a6831b484',
    description: 'User UUID',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'User Page',
    description: 'Page or module name',
  })
  @IsString()
  @IsNotEmpty()
  pageName: string;

  @ApiProperty({
    example: 'Anil Sharma',
    description: 'Name of the user who assigned the permission',
  })
  @IsString()
  @IsNotEmpty()
   assignedBy: string;

  @ApiProperty({
    example: true,
    description: 'Access permission (true = allowed, false = denied)',
  })
  @IsBoolean()
  @IsNotEmpty()
  accessControl: boolean;
}

export class GetPagesPermissionsDto{
  @ApiProperty({
    example: 'd12395bf-aad8-4f3b-9716-fe6a6831b484',
    description: 'User UUID',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}