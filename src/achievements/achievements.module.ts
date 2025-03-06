import { Module } from '@nestjs/common';
import { AchievementsGateway } from './achievements.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from './entities/achievement.entity';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { AuthModule } from 'src/users/auth/auth.module';
import { PostAchievementsLister } from './listeners/post-achievements.listener';
import { UsersModule } from 'src/users/users.module';
import { PointsAchievementsListener } from './listeners/points-achievements.listener';

@Module({
  providers: [AchievementsGateway, AchievementsService, PostAchievementsLister, PointsAchievementsListener],
  exports: [AchievementsGateway],
  imports: [
    TypeOrmModule.forFeature([Achievement]),
    AuthModule,
    UsersModule
  ],
  controllers: [AchievementsController]
})
export class AchievementsModule {}
