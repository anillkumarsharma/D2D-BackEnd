import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { successResponse } from 'src/common/utils/response.util';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) { }

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService
      .saveDepartment(createDepartmentDto)
      .then((data) => successResponse('Department created successfully', data));
  }

  @Get()
  findAll() {
    return this.departmentService
      .getAllDepartments()
      .then((data) => successResponse('Departments fetched successfully', data));
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService
      .updateDepartment(id, updateDepartmentDto)
      .then((data) => successResponse('Department updated successfully', data));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentService
      .deleteDepartment(id)
      .then((data) => successResponse('Department deleted successfully', data));
  }
}
