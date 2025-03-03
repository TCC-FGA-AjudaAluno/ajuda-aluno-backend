import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/database/postgres/postgres.module';
import { AchievementsSeederModule } from './achievements/achievements.module';
import { Seeder } from './seeder';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
    imports: [PostgresModule, AchievementsSeederModule, SubjectsModule],
    providers: [Seeder]
})
export class SeederModule {}
