import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({
    description: 'Supabase storage bucket name',
    example: 'CityLogo',
  })
  @IsString()
  @IsNotEmpty()
  bucket: string;

  @ApiProperty({
    description: 'File path inside the bucket',
    example: 'BKI.png',
  })
  @IsString()
  @IsNotEmpty()
  path: string;
}
