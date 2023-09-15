import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/users';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { user } = payload;

    const DBUser = await this.userRepository.findOneBy({ email: user });

    if (!DBUser) throw new UnauthorizedException('El Token no es valido');

    if (!DBUser.is_active)
      throw new UnauthorizedException(
        'El usuario no esta activo, comunicarse con un administrador',
      );

    return DBUser;
  }
}
