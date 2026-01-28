import {Controller,Get,HttpCode,HttpStatus,Param} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeTaskAssignmentService } from './fe-task-assignment.service';
import { successResponse } from 'src/common/utils/response.util';
import { FeTaskSummaryDto } from './dto/get-tasks-by-site.dto';

@ApiTags('FE Task Assignment')
@Controller('fe-task-assignment')
export class FeTaskAssignmentController {
  constructor(private readonly feTaskAssignmentService: FeTaskAssignmentService) {}

  @Get('tasks-by-site/:siteId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get field executive task assignments by site'})
  @ApiParam({name: 'siteId',example: '11',description: 'Site ID to fetch field executive task assignments'})
  @ApiResponse({status: 200,description: 'Task assignments fetched successfully'})
  @ApiResponse({status: 400,description: 'Invalid site id'})
  @ApiResponse({status: 500,description: 'Internal server error'})
  async getTasksBySite(@Param('siteId') siteId: string) {
    const data: FeTaskSummaryDto[] =
    await this.feTaskAssignmentService.getTasksBySite(siteId);

    return successResponse('Field executive task assignments fetched successfully',data);
  }
}
