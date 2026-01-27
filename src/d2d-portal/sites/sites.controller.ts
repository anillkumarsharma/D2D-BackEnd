import { SitesService } from './sites.service';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { successResponse } from 'src/common/utils/response.util';

@ApiTags('Sites')
@Controller('sites')
export class SitesController {
  constructor(private readonly SitesService: SitesService){}

  @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get Sites data' })
    @ApiResponse({ status: 200, description: 'Sites data fetched successfully' })
  async getSitesData(){
    const data = await this.SitesService.getSitesDataService();
    return successResponse('Sites data fetched successfully', data);
  }
}
