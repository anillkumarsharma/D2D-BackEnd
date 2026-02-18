import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDesignationDto {
  @IsString()
  @IsNotEmpty({ message: 'Designation name is required' })
  name: string;
}
