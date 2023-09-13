import { Module } from '@nestjs/common';

import { UsersModule } from 'src/users';

import { AuthService } from './services';
import { AuthController } from './controllers';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
