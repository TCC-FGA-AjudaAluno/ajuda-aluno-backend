import { Module } from '@nestjs/common';
import { AchievementsGateway } from './achievements.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from './entities/achievement.entity';

@Module({
  providers: [AchievementsGateway],
  exports: [AchievementsGateway],
  imports: [
    TypeOrmModule.forFeature([Achievement])
  ]
})
export class AchievementsModule {}
