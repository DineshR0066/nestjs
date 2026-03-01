import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RefreshAuthGuard } from './refresh-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refresh(@Request() req, @Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(req.user.userId, refreshTokenDto.refresh_token);
  }
}
