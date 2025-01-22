import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';

@Module({
  controllers: [PostsController],
  imports: [TypeOrmModule.forFeature([Post])]
})
export class PostsModule {}
