import { Body, Controller, HttpCode, HttpStatus, Post, Get, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeusersService } from './feusers.service';
import { AssignSiteDto, ChangeFEStatusDto, GetAllowedSitesDto, GetEmployeeByCodeDto } from './dto/fe-users.dto';

@ApiTags('FEUsers')
@Controller('fe-users')
export class FeusersController {
  constructor(private readonly feusersService: FeusersService) { }

  @Post('allowed-sites')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get sites allowed for manager to assign' })
  @ApiResponse({ status: 200, description: 'Allowed sites fetched successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllowedSites(@Body() body: GetAllowedSitesDto) {
    return this.feusersService.getAllowedSitesForManager(body);
  }

  @Post('employee-details')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get employee details by employee code' })
  @ApiResponse({ status: 200, description: 'Employee details fetched successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getEmployeeDetails(@Body() body: GetEmployeeByCodeDto) {
    return this.feusersService.getEmployeeDetailsByCode(body);
  }
  @Post('app-access')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Save Field Executive App access details' })
  @ApiResponse({ status: 200, description: 'FE app access saved successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async saveFEAppAccess(@Body() body) {
    return this.feusersService.saveFEAppAccess(body);
  }
  @Get('fe-users-list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get list of Field Executive App users' })
  async getFEUsersList() {
    return this.feusersService.getFEUsersList();
  }
  @Patch('change-status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Activate / Deactivate Field Executive' })
  async changeFEStatus(@Body() body: ChangeFEStatusDto) {
    return this.feusersService.changeFEStatus(body);
  }
  @Post('assign-site')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({  summary: 'Assign or update site for a Field Executive', })
async assignSite(@Body() body: AssignSiteDto) {
  return this.feusersService.assignOrUpdateSite(body);
}
}