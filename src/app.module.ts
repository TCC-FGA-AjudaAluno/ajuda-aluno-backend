import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsModule } from './posts/posts.module';
import { SubjectsModule } from './subjects/subjects.module';
import { InfosModule } from './infos/infos.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Token } from './users/auth/token.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'application',
      password: 'application',
      database: 'application',
      entities: [User, Token],
      synchronize: true
    }),
    ScheduleModule.forRoot(),
    PostsModule,
    SubjectsModule,
    InfosModule,
    TodosModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
