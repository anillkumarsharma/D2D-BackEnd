import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateDepartmentDto {

  @IsString()
  @IsNotEmpty({ message: 'Department name is required' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Branch ID is required' })
  branch_id: number;

  @IsString()
  @IsNotEmpty({ message: 'Department code is required' })
  code: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;   // default true from entity
}
