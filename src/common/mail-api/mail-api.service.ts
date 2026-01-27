import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { SendFEAppAccessMailDto } from './dto/send-mail.dto';
import { parseTemplate } from '../utils/response.util';

@Injectable()
export class MailApiService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Send FE App access email
   * Author: Ritik Parmar | 27 Jan 2026
   */
  async sendFEAppAccessMail(dto: SendFEAppAccessMailDto) {
    const { to, subject, template, data } = dto;

    const mailApiUrl = process.env.MAIL_API;

    // ✅ ENV safety check (important)
    if (!mailApiUrl) {
      return {
        status: 'fail',
        message: 'MAIL_API not configured',
        data: null,
      };
    }

    // Replace placeholders in template using provided data
    const htmlContent = parseTemplate(template, data);

    const payload = {
      to,
      subject,
      html: htmlContent,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post<any>(mailApiUrl, payload, {
          headers: { 'Content-Type': 'application/json' },
        }),
      );

      return {
        status: 'success',
        message: 'FE App access email sent successfully',
        data: response?.data ?? null,
      };
    } catch (error: any) {
      return {
        status: 'fail',
        message:
          error?.response?.data?.message ||
          error?.message ||
          'Failed to send FE App access email',
        data: null,
      };
    }
  }
}
