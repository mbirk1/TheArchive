import { Controller, Post, UseGuards, Req, HttpCode, Logger, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Req() req) {
    this.logger.log(`Login request for: ${req.user?.email}`);

    if (!req.user) {
      this.logger.error('Login guard passed but req.user is undefined');
      throw new InternalServerErrorException();
    }

    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() req) {
    this.logger.debug(`Refresh request for userId: ${req.user?.sub}`);

    if (!req.user?.sub || !req.user?.refreshToken) {
      this.logger.error('Refresh guard passed but required fields missing');
      throw new InternalServerErrorException();
    }

    return this.authService.refresh(req.user.sub, req.user.refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req) {
    this.logger.log(`Logout request for userId: ${req.user?.userId}`);

    if (!req.user?.userId) {
      this.logger.error('Logout guard passed but userId missing');
      throw new InternalServerErrorException();
    }

    return this.authService.logout(req.user.userId);
  }
}