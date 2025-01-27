import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/users/auth/@types/authenticated-request';
import { Token } from 'src/users/auth/token.entity';
import { CreatePostDTO, CreatePostRequestDTO } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('subjects/:subjectId/posts')
export class PostsController {
    constructor(private service: PostsService) {}

    @UseGuards(AuthGuard)
    @Get('/')
    async findAll(@Param('subjectId') subjectId: string) {
        console.log(`Retrieving posts for subject: ${subjectId}`)
        const posts = await this.service.findAll(subjectId)
        return posts
    }

    @Get('/:postId')
    async findOne() { }

    @UseGuards(AuthGuard)
    @Post('/')
    async create(@Body() body: CreatePostRequestDTO, @Param('subjectId') subjectId: string, @Request() req: AuthenticatedRequest) {
        console.log('Creating post!')
        const userToken = req.auth
        const data = new CreatePostDTO(body, subjectId, userToken.user.id)

        return this.service.create(data)
    }

    @Delete('/:postId')
    async remove() { }

    @Patch('/:postId')
    async update() { }
}
