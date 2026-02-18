import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { successResponse } from 'src/common/utils/response.util';

@Controller('designation')
export class DesignationController {
  constructor(private readonly designationService: DesignationService) {}

  @Post('department/:departmentId')
  create(
    @Param('departmentId', ParseIntPipe) departmentId: number,
    @Body() createDesignationDto: CreateDesignationDto,
  ) {
    return this.designationService
      .saveDesignation(departmentId, createDesignationDto)
      .then((data) => successResponse('Designation created successfully', data));
  }

  @Get('department/:departmentId')
  findAll(@Param('departmentId', ParseIntPipe) departmentId: number) {
    return this.designationService
      .getAllDesignationsByDepartment(departmentId)
      .then((data) => successResponse('Designations fetched successfully', data));
  }

  @Patch('department/:departmentId/:id')
  update(
    @Param('departmentId', ParseIntPipe) departmentId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDesignationDto: UpdateDesignationDto,
  ) {
    return this.designationService
      .updateDesignation(departmentId, id, updateDesignationDto)
      .then((data) => successResponse('Designation updated successfully', data));
  }

  @Delete('department/:departmentId/:id')
  remove(
    @Param('departmentId', ParseIntPipe) departmentId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.designationService
      .deleteDesignation(departmentId, id)
      .then((data) => successResponse('Designation deleted successfully', data));
  }
}
