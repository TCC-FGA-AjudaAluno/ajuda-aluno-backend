import { Module } from '@nestjs/common';
import { InfosController } from './infos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from './infos.entity';
import { AuthModule } from 'src/users/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { InfosService } from './infos.service';

@Module({
  controllers: [InfosController],
  imports: [TypeOrmModule.forFeature([Info]), UsersModule],
  providers: [InfosService]
})
export class InfosModule { }
