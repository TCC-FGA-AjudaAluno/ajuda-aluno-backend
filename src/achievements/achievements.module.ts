import { Module } from '@nestjs/common';
import { AchievementsGateway } from './achievements.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from './entities/achievement.entity';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { AuthModule } from 'src/users/auth/auth.module';

@Module({
  providers: [AchievementsGateway, AchievementsService],
  exports: [AchievementsGateway],
  imports: [
    TypeOrmModule.forFeature([Achievement]),
    AuthModule
  ],
  controllers: [AchievementsController]
})
export class AchievementsModule {}
