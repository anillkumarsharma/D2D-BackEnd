import { Body, Controller, HttpCode, HttpStatus, Post, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeusersService } from './feusers.service';
import { 
  AssignSiteDto, 
  ChangeFEStatusDto, 
  FELoginDto, 
  GetAllowedSitesDto, 
  GetEmployeeByCodeDto, 
  GetFEUsersListDto, // 👈 New DTO added
  SaveFEAppAccessDto  // 👈 New DTO added
} from './dto/fe-users.dto';

@ApiTags('FEUsers')
@Controller('fe-users')
export class FeusersController {
  constructor(private readonly feusersService: FeusersService) { }

  @Post('allowed-sites')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get sites allowed for manager to assign' })
  async getAllowedSites(@Body() body: GetAllowedSitesDto) {
    return this.feusersService.getAllowedSitesForManager(body);
  }

  @Post('employee-details')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get employee details by employee code' })
  async getEmployeeDetails(@Body() body: GetEmployeeByCodeDto) {
    return this.feusersService.getEmployeeDetailsByCode(body);
  }

  @Post('app-access')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Save Field Executive App access details' })
  async saveFEAppAccess(@Body() body: SaveFEAppAccessDto) {
    return this.feusersService.saveFEAppAccess(body);
  }

  // 🔄 Updated from @Get to @Post to accept filtering criteria
  @Post('fe-users-list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get filtered FE users list based on manager permissions' })
  @ApiResponse({ status: 200, description: 'Filtered list fetched successfully' })
  async getFEUsersList(@Body() body: GetFEUsersListDto) {
    // Service function ko params pass kar rahe hain
    return this.feusersService.getFEUsersList(body.managerId, body.allowedSites);
  }

  @Patch('change-status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Activate / Deactivate Field Executive' })
  async changeFEStatus(@Body() body: ChangeFEStatusDto) {
    return this.feusersService.changeFEStatus(body);
  }

  @Post('assign-site')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign or update site for a Field Executive' })
  async assignSite(@Body() body: AssignSiteDto) {
    return this.feusersService.assignOrUpdateSite(body);
  }

  @Post('fe-login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login for Field Executive Application' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async feLogin(@Body() dto: FELoginDto) {
    return await this.feusersService.feLogin(dto);
  }
}