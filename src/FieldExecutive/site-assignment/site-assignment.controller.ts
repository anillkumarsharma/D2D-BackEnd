import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SiteAssignmentService } from './site-assignment.service';
import { CreateSiteAssignmentDto, UnassignSiteDto } from './dto/site-assignment.dto';

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
    return this.SiteAssignmentService.AssignSite(body);
  }

  @Delete('unassignsite')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Unassign site' })
  @ApiResponse({ status: 201, description: 'Employee site access removed successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async unAssignSite(@Body() body: UnassignSiteDto) {
    return this.SiteAssignmentService.UnAssignSite(body);
  }
}

 





