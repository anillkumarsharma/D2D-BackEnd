import { SitesService } from './sites.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { successResponse } from 'src/common/utils/response.util';
import { CreateSiteDto } from './dto/create-site.dto';

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

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Site' })
  @ApiResponse({ status: 201, description: 'Site created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 409, description: 'Site code already exists',})
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createNewSite(@Body() body: CreateSiteDto){
    const data = await this.SitesService.createNewSiteService(body);
    return successResponse('New site created successfully',data);
  }
}
