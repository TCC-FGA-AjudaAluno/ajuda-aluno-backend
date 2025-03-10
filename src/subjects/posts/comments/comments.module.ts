import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { AuthModule } from 'src/users/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), AuthModule, UsersModule],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule {}
