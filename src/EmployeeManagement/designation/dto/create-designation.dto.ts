import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDesignationDto {
  @IsString()
  @IsNotEmpty({ message: 'Designation name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Designation code is required' })
  code: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
