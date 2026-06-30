import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from '../decorators/public.decorator';

@Controller('email')
export class EmailController {

  constructor(private readonly emailService: EmailService) {}

  @Public()
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return await this.emailService.verifyEmail(token);
  }
}
