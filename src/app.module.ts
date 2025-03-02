import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfosModule } from './infos/infos.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { VotesModule } from './votes/votes.module';
import { AchievementsModule } from './achievements/achievements.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    SubjectsModule,
    InfosModule,
    TodosModule,
    UsersModule,
    EventsModule,
    VotesModule,
    AchievementsModule,
    PostgresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
