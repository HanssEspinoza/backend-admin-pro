import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities';
import { MyResponse } from 'src/core';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async update(
    user_id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<MyResponse<User>> {
    const user = await this.userRepository.preload({
      user_id,
      ...updateUserDto,
    });

    if (!user)
      throw new NotFoundException(`El usuario #${user_id} no fue encotrado`);

    try {
      await this.userRepository.save(user);

      const response: MyResponse<User> = {
        statusCode: 200,
        status: 'OK',
        message: `El usuario ${user.email} fue actualizado correctamente`,
        reply: user,
      };

      return response;
    } catch (error) {
      console.log(error);
      this.handleDBErrors(error);
    }
  }

  async remove(user_id: string): Promise<MyResponse<Record<string, never>>> {
    const user = await this.userRepository.preload({
      user_id,
      is_active: false,
    });

    if (!user)
      throw new NotFoundException(`El usuario #${user_id} no fue encotrado`);

    try {
      await this.userRepository.save(user);

      const response: MyResponse<Record<string, never>> = {
        statusCode: 200,
        status: 'OK',
        message: `El usuario ${user.email} fue inhabilitado correctamente`,
        reply: {},
      };

      return response;
    } catch (error) {
      console.log(error);
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    throw new BadRequestException(`El error: ${error.message}`);
  }
}
