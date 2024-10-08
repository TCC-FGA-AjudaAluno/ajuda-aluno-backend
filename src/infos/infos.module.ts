import { Module } from '@nestjs/common';
import { InfosController } from './infos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from './infos.entity';
import { AuthModule } from 'src/users/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { InfosService } from './infos.service';
import { User } from 'src/users/user.entity';

@Module({
  controllers: [InfosController],
  imports: [TypeOrmModule.forFeature([Info, User]), UsersModule],
  providers: [InfosService]
})
export class InfosModule { }
