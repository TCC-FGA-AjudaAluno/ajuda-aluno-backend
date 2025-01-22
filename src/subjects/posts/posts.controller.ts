import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('subjects/:subjectId/posts')
export class PostsController {

    @Get('/')
    async findAll(@Param('subjectId') subjectId: string) {
        console.log(`Retrieving posts for subject: ${subjectId}`)
        
        return {
            subjectId: subjectId
        }
    }

    @Get('/:postId')
    async findOne() {}

    @Post('/')
    async create() {}

    @Delete('/:postId')
    async remove() {}

    @Patch('/:postId')
    async update() {}
}
