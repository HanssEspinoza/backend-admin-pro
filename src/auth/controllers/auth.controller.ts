import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '../dto';

import { User } from 'src/users';
import { MyResponse } from 'src/core';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<MyResponse<User>> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<MyResponse<User>> {
    return this.authService.login(loginDto);
  }
}
