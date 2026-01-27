import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe, // <-- add this
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branches.dto';
import { UpdateBranchDto } from './dto/update-branches-dto';
import { successResponse } from 'src/common/utils/response.util';

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  // CREATE BRANCH
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new branch' })
  @ApiResponse({ status: 201, description: 'Branch created successfully' })
  async createBranch(@Body() body: CreateBranchDto) {
    const data = await this.branchesService.createBranch(body);
    return successResponse('Branch created successfully', data);
  }

  // UPDATE BRANCH
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update branch' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Branch updated successfully' })
  async updateBranch(
    @Param('id', ParseIntPipe) id: number, // <-- fixed here
    @Body() body: UpdateBranchDto,
  ) {
    const data = await this.branchesService.updateBranch(id, body);
    return successResponse('Branch updated successfully', data);
  }

  // GET ALL BRANCHES
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all branches' })
  @ApiResponse({ status: 200, description: 'Branches fetched successfully' })
  async getAllBranches() {
    const data = await this.branchesService.getAllBranches();
    return successResponse('Branches fetched successfully', data);
  }

  // GET BRANCH BY ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get branch by id' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Branch fetched successfully' })
  async getBranchById(@Param('id', ParseIntPipe) id: number) { // <-- fixed here
    const data = await this.branchesService.getBranchById(id);
    return successResponse('Branch fetched successfully', data);
  }

  // DELETE BRANCH
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete branch' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Branch deleted successfully' })
  async deleteBranch(@Param('id', ParseIntPipe) id: number) { // <-- fixed here
    const data = await this.branchesService.deleteBranch(id);
    return successResponse('Branch deleted successfully', data);
  }
}
