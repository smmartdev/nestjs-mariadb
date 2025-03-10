// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string, password: string }) {
    try {
      return this.authService.login(body.username, body.password);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Post('hash')
  async hash(@Body() body: { password: string }) {
    return this.authService.generateHash(body.password);
  }


  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    try {
      return this.authService.refreshToken(body.refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}