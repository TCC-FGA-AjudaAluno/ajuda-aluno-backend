import { Module } from '@nestjs/common';
import { AchievementsGateway } from './achievements.gateway';

@Module({
  providers: [AchievementsGateway],
  exports: [AchievementsGateway],
})
export class AchievementsModule {}
