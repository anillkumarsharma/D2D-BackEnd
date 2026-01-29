import { Body, Controller,Get,HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { successResponse } from 'src/common/utils/response.util';
import { CreateUserDto, UpdateUserDto } from './dto/user-management.dto';
import { UserManagementService } from './user-management.service';

@ApiTags('UserManagement')

@Controller('users')
export class UserManagementController {
  constructor(private readonly UserManagementService:UserManagementService){}
  @Post('createuser')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async addUser(@Body() body: CreateUserDto) {
   const data =  await  this.UserManagementService.CreateUser(body);
   return successResponse('User created successfully', data);
  }
  @Get('getuser')
@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: 'Get all users' })
@ApiResponse({ status: 200, description: 'Users fetched successfully' })
@ApiResponse({ status: 500, description: 'Internal server error' })
async getUser() {
  const data = await this.UserManagementService.getAllUsers();
  return successResponse('Users fetched successfully', data);
}

@Patch(':id')
@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: 'Update user details' })
@ApiParam({
  name: 'id',
  example: '032dd157-7688-48e8-a6d0-535dbbcfc062',
  description: 'User UUID',
})
@ApiResponse({ status: 200, description: 'User updated successfully' })
@ApiResponse({ status: 400, description: 'Validation failed' })
@ApiResponse({ status: 404, description: 'User not found' })
@ApiResponse({ status: 500, description: 'Internal server error' })
async updateUser(
  @Param('id') id: string,
  @Body() body: UpdateUserDto,
) 
{
  const data = await this.UserManagementService.UpdateUser(id, body);
  return successResponse('User updated successfully', data);
}


}

 





