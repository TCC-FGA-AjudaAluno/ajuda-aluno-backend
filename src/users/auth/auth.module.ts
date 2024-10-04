import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UsersModule } from '../users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Token } from './token.entity';
import { AuthRepository } from './auth.repository';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User, Token]), forwardRef(() => UsersModule)],
  providers: [AuthService, AuthRepository]
})
export class AuthModule { }
