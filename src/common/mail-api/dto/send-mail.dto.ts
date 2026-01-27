import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class SendFEAppAccessMailDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Receiver email address',
  })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    example: 'FE App Access Details',
    description: 'Email subject',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    example: '<p>User: {{userId}}</p><p>Password: {{password}}</p>',
    description: 'HTML email template with placeholders',
  })
  @IsString()
  @IsNotEmpty()
  template: string;

  @ApiProperty({
    example: { userId: '101', password: '834921' },
    description: 'Dynamic data to replace template placeholders',
  })
  @IsObject()
  @IsNotEmpty()
  data: Record<string, any>;
}
