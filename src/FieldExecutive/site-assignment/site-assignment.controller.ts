import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SiteAssignmentService } from './site-assignment.service';
import { CreateSiteAssignmentDto, GetAssignedSiteDto, UnassignSiteDto } from './dto/site-assignment.dto';
import { successResponse } from 'src/common/utils/response.util';

@ApiTags('SiteAssignment')

@Controller('site-assignment')
export class SiteAssignmentController {
  constructor(private readonly SiteAssignmentService: SiteAssignmentService){}
  @Post('assignsite')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Assign new site' })
  @ApiResponse({ status: 201, description: 'Site assigned successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async assignSite(@Body() body: CreateSiteAssignmentDto) {
   const data =  await  this.SiteAssignmentService.AssignSite(body);
   return successResponse('Site assigned successfully', data);
  }

  @Delete('unassignsite')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Unassign site' })
  @ApiResponse({ status: 201, description: 'Employee site access removed successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async unAssignSite(@Body() body: UnassignSiteDto) {
  const data =  await  this.SiteAssignmentService.UnAssignSite(body);
  return successResponse('Site unassigned successfully', data);
  }

  
  @Get('getassignedsites')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get assigned sites'})
  @ApiResponse({ status: 200, description: 'Sites fetched successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAssignSites(@Query() query: GetAssignedSiteDto) {
   const data =  await this.SiteAssignmentService.GetAssignedSites(query);
   return successResponse('Sites feched successfully', data);
  }
}

 





