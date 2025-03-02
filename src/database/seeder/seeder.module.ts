import { Logger, Module } from '@nestjs/common';
import { PostgresModule } from 'src/database/postgres/postgres.module';
import { Seeder } from './seeder';
import { AchievementsSeederModule } from './achievements/achievements.module';

@Module({
    imports: [PostgresModule, AchievementsSeederModule],
    providers: [Seeder, Logger]
})
export class SeederModule {}
