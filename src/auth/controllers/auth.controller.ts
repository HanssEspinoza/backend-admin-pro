import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { ChangePasswordDto, LoginDto, RegisterDto } from '../dto';

import { User } from 'src/users';
import { MyResponse } from 'src/core';
import { LoginResponse } from '../interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<MyResponse<User>> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<MyResponse<LoginResponse>> {
    return this.authService.login(loginDto);
  }

  @Post('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}
