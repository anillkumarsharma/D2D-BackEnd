import { Body, Controller,Get,HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PagesPermissionService } from './pages-permission.service';
import { CreatePagesPermissionsDto, GetPagesPermissionsDto } from './dto/pages-permission.dto';
import { successResponse } from 'src/common/utils/response.util';

@ApiTags('PagesPermissions')

@Controller('pages-permission')
export class PagesPermissionController {
  constructor(private readonly PagesPermissionService: PagesPermissionService){}
  @Post('updatepermission')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Permission Allowed/Denied' })
  @ApiResponse({ status: 201, description: 'Permission updated successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateAccess(@Body() body: CreatePagesPermissionsDto) {
  const data =  await this.PagesPermissionService.updatePermission(body);
  return successResponse('Permission updated successfully', data);
  }

@Get('getpermissions')
@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: 'Get user page permissions' })
@ApiResponse({ status: 200, description: 'Permission fetched successfully' })
@ApiResponse({ status: 400, description: 'Validation failed' })
@ApiResponse({ status: 500, description: 'Internal server error' })
async getAccess(@Query() query: GetPagesPermissionsDto) {
   const data =  await this.PagesPermissionService.getPermission(query);
  return successResponse('Permission feched successfully', data);
}

}

 








