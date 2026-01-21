import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Boss' })
  name: string;

  @ApiProperty({ example: 'boss@gmail.com' })
  email: string;

  @ApiProperty({ example: '9999999999' })
  phone: string;
}
