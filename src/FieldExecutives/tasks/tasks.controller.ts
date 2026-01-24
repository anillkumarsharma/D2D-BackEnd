import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { successResponse } from 'src/common/utils/response.util';

@ApiTags('Tasks')

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createTask(@Body() body: CreateTaskDto) {
    const data = await this.tasksService.createTaskService(body);
    return successResponse('Task created successfully', data);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update task "})
  @ApiParam({name : 'id', example:1})
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
  ){
    const data = await this.tasksService.updateTaskService(id, body);
    return successResponse("Task Updated successfully", data)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Tasks fetched successfully' })
  async getAllTasks(){
    const data = await this.tasksService.getAllTasksService();
    return successResponse("Tasks fetched successfully",data)
  }
}

