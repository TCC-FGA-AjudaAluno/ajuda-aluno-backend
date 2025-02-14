import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { PostsService } from './posts.service';
import { AuthModule } from 'src/users/auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostsController],
  imports: [AuthModule, TypeOrmModule.forFeature([Post]), CommentsModule, UsersModule],
  providers: [PostsService]
})
export class PostsModule {}
