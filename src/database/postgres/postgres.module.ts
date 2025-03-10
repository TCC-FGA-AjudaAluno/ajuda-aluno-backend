import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from 'src/achievements/entities/achievement.entity';
import { EventEntity } from 'src/events/entities/event.entity';
import { Info } from 'src/infos/infos.entity';
import { Enrollment } from 'src/subjects/entities/enrollment.entity';
import { Subject } from 'src/subjects/entities/subjects.entity';
import { Material } from 'src/subjects/materials/materials.entity';
import { Post } from 'src/subjects/posts/posts.entity';
import { Todo } from 'src/todos/todos.entity';
import { Token } from 'src/users/auth/token.entity';
import { User } from 'src/users/user.entity';
import { Vote } from 'src/votes/vote.entity';
import { Comment } from 'src/subjects/posts/comments/comments.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'application',
        password: 'application',
        database: 'application',
        entities: [User, Token, Info, Subject, Enrollment, Post, Comment, Material, Todo, EventEntity, Vote, Achievement],
        synchronize: true
    })]
})
export class PostgresModule { }
