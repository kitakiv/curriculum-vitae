import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('google')
export class GoogleauthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('callback')
  async googleCallback(@Req() req, @Res() res) {
    const response = await this.authService.loginGoogle({
      login: req.user.login,
      provider: req.user.provider,
      googleId: req.user.googleId,
      isEmailVerified: req.user.isEmailVerified,
    });
    res.redirect(
      `${this.configService.getOrThrow<string>('FRONTEND_URL')}?token=${response.tokens.accessToken}`,
    );
  }
}
