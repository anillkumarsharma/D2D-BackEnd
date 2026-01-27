import { Body, Controller,Get,HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PagesPermissionService } from './pages-permission.service';
import { CreatePagesPermissionsDto, GetPagesPermissionsDto } from './dto/pages-permission.dto';

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
    return this.PagesPermissionService.updatePermission(body);
  }

@Get('getpermissions')
@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: 'Get user page permissions' })
@ApiResponse({ status: 200, description: 'Permission fetched successfully' })
@ApiResponse({ status: 400, description: 'Validation failed' })
@ApiResponse({ status: 500, description: 'Internal server error' })
async getAccess(@Query() query: GetPagesPermissionsDto) {
  return this.PagesPermissionService.getPermission(query);
}

}

 








