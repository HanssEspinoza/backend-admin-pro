import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';

import { UsersService } from '../services';
import { UpdateUserDto } from '../dto';
import { MyResponse } from 'src/core';
import { User } from '../entities';
import { Auth } from 'src/auth/decorators';

@Controller('users')
@Auth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':user_id')
  update(
    @Param('user_id', ParseUUIDPipe) user_id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<MyResponse<User>> {
    return this.usersService.update(user_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
