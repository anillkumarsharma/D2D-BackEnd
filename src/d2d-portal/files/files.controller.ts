import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { successResponse } from 'src/common/utils/response.util';
import { UploadFileDto } from './dto/upload-file.dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload file to storage' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
      bucket: {
        type: 'string',
        example: 'CityLogo',
      },
      path: {
        type: 'string',
        example: 'BKI.png',
      },
    },
    required: ['file', 'bucket', 'path'],
  },
})
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles (
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ){
    if(!file){
      throw new BadRequestException('File is required');
    }

    const result = await this.filesService.uploadToStorage(file, body.bucket, body.path)
    return successResponse("file uploaded to storage successfully", result)
  }
}
