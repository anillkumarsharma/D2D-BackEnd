import { SitesService } from './sites.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { successResponse } from 'src/common/utils/response.util';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

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

  @Patch(`:id`)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update site data'})
  @ApiParam({name : 'id', example:1})
 @ApiResponse({ status: 200, description: 'Site updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 404, description: 'Site not found' })
  @ApiResponse({ status: 409, description: 'Duplicate site name' })
  async updateSiteData(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSiteDto){
    const data = await this.SitesService.updateSiteService(id, body);
    return successResponse('Site data updated successfully',data)
  }
}
