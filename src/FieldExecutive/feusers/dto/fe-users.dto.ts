import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

/* ===============================
   1️⃣ Get sites allowed for manager
================================= */
export class GetAllowedSitesDto {
  @ApiProperty({
    example: 'd12395bf-aad8-4f3b-9716-fe6a6831b484',
    description: 'Manager user UUID',
  })
  @IsUUID()
  @IsNotEmpty()
  managerId: string;
}
export class GetEmployeeByCodeDto {
  @ApiProperty({
    example: '101',
    description: 'Employee Code',
  })
  @IsString()
  @IsNotEmpty()
  employeeCode: string;
}

export class SaveFEAppAccessDto {
  @ApiProperty({ example: 'EMP101' })
  @IsString()
  @IsNotEmpty()
  employeeCode: string;

  @ApiProperty({ example: 'fe_ritik' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: '834921' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Ritik Parmar' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ritik@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '<p>Hello {{name}}</p><p>User: {{userName}}</p><p>Password: {{password}}</p>',
  })
  @IsString()
  @IsNotEmpty()
  mailTemplate: string;

  @ApiProperty({
    example: 'd12395bf-aad8-4f3b-9716-fe6a6831b484',
  })
  @IsUUID()
  @IsNotEmpty()
  createdBy: string;
}
export class ChangeFEStatusDto {
  @ApiProperty({ example: '10002' })
  @IsString()
  @IsNotEmpty()
  employeeCode: string;

  @ApiProperty({
    example: 'INACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
  })
  @IsString()
  @IsIn(['ACTIVE', 'INACTIVE'])
  status: 'ACTIVE' | 'INACTIVE';
}

export class AssignSiteDto {
  @ApiProperty({ example: '10002' })
  @IsString()
  @IsNotEmpty()
  employeeCode: string;

  @ApiProperty({ example: 78 })
  @IsInt()
  @IsNotEmpty()
  siteId: number;

  @ApiProperty({
    example: 'd12395bf-aad8-4f3b-9716-fe6a6831b484',
    description: 'Manager/Admin who assigns or updates site',
  })
  @IsUUID()
  @IsNotEmpty()
  assignedBy: string;
}
export class FELoginDto {
  @ApiProperty({ example: '101' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'ABH102' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class GetFEUsersListDto {
  @ApiProperty({
    example: 'd12395bf-aad8-4f3b-9716-fe6a6831b484',
    description: 'Manager UUID to check created_by ownership',
  })
  @IsUUID()
  @IsNotEmpty()
  managerId: string;

  @ApiProperty({
    example: [78, 102, 45],
    description: 'Array of site IDs allowed for this manager',
    type: [Number],
  })
  @IsNotEmpty()
  // Array validation ke liye (Transform handle karne ke liye @IsOptional bhi laga sakte hain agar empty allow karna ho)
  allowedSites: number[];
}