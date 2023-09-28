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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleDBErrors(error: any): never {
    throw new BadRequestException(`El error: ${error.message}`);
  }
}
