import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/database/postgres/postgres.module';
import { AchievementsSeederModule } from './achievements/achievements.module';
import { Seeder } from './seeder';

@Module({
    imports: [PostgresModule, AchievementsSeederModule],
    providers: [Seeder]
})
export class SeederModule {}
