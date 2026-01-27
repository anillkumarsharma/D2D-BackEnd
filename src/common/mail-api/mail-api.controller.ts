import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MailApiService } from './mail-api.service';
import { SendFEAppAccessMailDto } from './dto/send-mail.dto';

@ApiTags('Mail')
@Controller('mail')
export class MailApiController {
  constructor(private readonly mailApiService: MailApiService) {}

  @Post('fe-app-access')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send FE App access email' })
  async sendFEAppAccessMail(@Body() body: SendFEAppAccessMailDto) {
    return this.mailApiService.sendFEAppAccessMail(body);
  }
}
