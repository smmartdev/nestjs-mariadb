// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() body: LoginDto) {
    console.log("login called in controller")
    try {
      return this.authService.login(body);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    try {
      // Calling AuthService's signup method to handle user registration
      return await this.authService.signup(body);
    } catch (error) {
      // Handle any error that may arise during the signup process
      throw error;
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