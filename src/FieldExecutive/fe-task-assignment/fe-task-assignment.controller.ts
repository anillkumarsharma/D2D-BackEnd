import {Body, Controller,Get,HttpCode,HttpStatus,Param, Post} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeTaskAssignmentService } from './fe-task-assignment.service';
import { successResponse } from 'src/common/utils/response.util';
import { FeTaskSummaryDto } from './dto/get-tasks-by-site.dto';
import { AssignTaskDto } from './dto/assign-task.dto';

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

  @Post('assign-task')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Assign task' })
  @ApiResponse({
  status: HttpStatus.CREATED,
  description: 'Task assigned successfully',
})
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: 'Invalid or missing request data',
})

@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Failed to assign task',
})
  async assignTask(@Body() body:AssignTaskDto){
    const data = await this.feTaskAssignmentService.assignTaskService(body)
    return successResponse('Task Assigned successfully',data)
  }
}
