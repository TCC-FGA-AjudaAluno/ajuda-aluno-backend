import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Info } from './infos/infos.entity';
import { InfosModule } from './infos/infos.module';
import { Enrollment } from './subjects/entities/enrollment.entity';
import { Subject } from './subjects/entities/subjects.entity';
import { Post } from './subjects/posts/posts.entity';
import { SubjectsModule } from './subjects/subjects.module';
import { TodosModule } from './todos/todos.module';
import { Token } from './users/auth/token.entity';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Comment } from './subjects/posts/comments/comments.entity';
import { Material } from './subjects/materials/materials.entity';
import { Todo } from './todos/todos.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'application',
      password: 'application',
      database: 'application',
      entities: [User, Token, Info, Subject, Enrollment, Post, Comment, Material, Todo],
      synchronize: true
    }),
    ScheduleModule.forRoot(),
    SubjectsModule,
    InfosModule,
    TodosModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
