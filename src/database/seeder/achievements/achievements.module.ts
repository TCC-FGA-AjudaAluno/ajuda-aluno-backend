import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from 'src/achievements/entities/achievement.entity';
import { AchievementsSeederService } from './achievements.service';

@Module({
    imports: [TypeOrmModule.forFeature([Achievement])],
    providers: [AchievementsSeederService],
    exports: [AchievementsSeederService]
})
export class AchievementsSeederModule {}
