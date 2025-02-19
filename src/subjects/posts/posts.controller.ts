import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/users/auth/@types/authenticated-request';
import { Token } from 'src/users/auth/token.entity';
import { CreatePostDTO, CreatePostRequestDTO } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { DeepPartial } from 'typeorm';
import { Post as PostEntity } from './posts.entity';
import { AuthUser } from 'src/users/auth/auth.decorator';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('subjects/:subjectId/posts')
export class PostsController {
    constructor(
        private service: PostsService,
        private userService: UsersService
    ) {}

    @UseGuards(AuthGuard)
    @Get('/')
    async findAll(@Param('subjectId') subjectId: string, @AuthUser() user: User) {
        console.log(`Retrieving posts for subject: ${subjectId}`)
        const posts = await this.service.findAll(subjectId, user.id)
        return posts
    }

    @UseGuards(AuthGuard)
    @Get('/:postId')
    async findOne(@Param('postId') postId: string) {
        const result = await this.service.findOne(postId)

        return result
    }

    @UseGuards(AuthGuard)
    @Post('/')
    async create(
        @Body() body: CreatePostRequestDTO,
        @Param('subjectId') subjectId: string,
        @AuthUser() user: User
    ) {
        console.log('Creating post!')
        this.userService.updatePoints(user, 7)
        const data = new CreatePostDTO(body, subjectId, user.id)

        return this.service.create(data)
    }

    @UseGuards(AuthGuard)
    @Delete('/:postId')
    @HttpCode(204)
    async remove(@Param('postId') postId: string) {
        console.log('Removing post with id ' + postId)
        return this.service.remove(postId)
    }

    @UseGuards(AuthGuard)
    @Patch('/:postId')
    async update(@Param('postId') postId: string, @Body() body: DeepPartial<PostEntity>) {
        return this.service.update(postId, body)
    }
}
