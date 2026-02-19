import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDepartmentDto {

  @IsString()
  @IsNotEmpty({ message: 'Department name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Department code is required' })
  code: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
