import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FieldExecutivesService } from './field-executives.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('Field Executives')
@Controller('field-executives')
export class FieldExecutivesController {
  constructor(private readonly fieldExecutivesService: FieldExecutivesService){}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createTask(@Body() body: CreateTaskDto) {
    return this.fieldExecutivesService.createTaskService(body);
  }
}