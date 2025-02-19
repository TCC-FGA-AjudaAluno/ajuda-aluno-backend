import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { AuthModule } from 'src/users/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [VotesService],
  controllers: [VotesController],
  imports: [TypeOrmModule.forFeature([Vote]), AuthModule, UsersModule]
})
export class VotesModule {}
