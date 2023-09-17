import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { ChangePasswordDto, LoginDto, RegisterDto } from '../dto';
import { User } from 'src/users';
import { MyResponse } from 'src/core';
import { JwtPayload, LoginResponse } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<MyResponse<User>> {
    const { password, ...userData } = registerDto;

    const userVerificacion = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (userVerificacion)
      throw new BadRequestException('El usuario con ese correo ya existe');

    try {
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password, delete user.is_active;

      const response: MyResponse<User> = {
        statusCode: 201,
        status: 'Created',
        message: `Usuario con el email ${userData.email} ha sido creado con éxito`,
        reply: user,
      };

      return response;
    } catch (error) {
      console.log(error);
      this.handleDBErrors(error);
    }
  }

  async login(loginDto: LoginDto): Promise<MyResponse<LoginResponse>> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        user_id: true,
        password: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    if (!user)
      throw new UnauthorizedException('Las credenciales no son validas');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Las credenciales no son validas');

    delete user.password, delete user.is_active;

    const token = this.getJwtToken({
      sub: user.user_id,
      user: user.email,
    });

    const response: MyResponse<LoginResponse> = {
      statusCode: 201,
      status: 'Created',
      message: 'Usuario encontrado con éxito',
      reply: {
        user_id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        token,
      },
    };

    return response;
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    decoratorUser: User,
  ) {
    const { old_password, new_password } = changePasswordDto;

    const user = await this.userRepository.findOne({
      where: { user_id: decoratorUser.user_id },
      select: {
        password: true,
      },
    });

    if (!bcrypt.compareSync(old_password, user.password))
      throw new BadRequestException('Las credenciales no son validas');

    try {
      const encodedPassword = bcrypt.hashSync(new_password, 10);

      const patchUser = await this.userRepository.preload({
        user_id: decoratorUser.user_id,
        password: encodedPassword,
      });

      await this.userRepository.save(patchUser);

      const response: MyResponse<Record<string, never>> = {
        statusCode: 200,
        status: 'Ok',
        message: 'La Contraseña se cambio con éxito',
        reply: {},
      };

      return response;
    } catch (error) {
      console.log(error);
      this.handleDBErrors(error);
    }
  }

  private getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23502') {
      throw new BadRequestException(error.detail);
    }
    throw new BadRequestException('Revisar los logs del servidor');
  }
}
