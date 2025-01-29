import { Body, Controller, Delete, HttpCode, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { AuthenticatedRequest } from 'src/users/auth/@types/authenticated-request';

@Controller('comments')
export class CommentsController {
    constructor(private service: CommentsService) {}

    @UseGuards(AuthGuard)
    @Post('/')
    async create(@Body() body: CreateCommentDTO, @Request() req: AuthenticatedRequest) {
        const user = req.auth.user
        body.authorId = user.id

        return this.service.create(body)
    }

    @UseGuards(AuthGuard)
    @Delete('/:commentId')
    @HttpCode(204)
    async remove(@Param('commentId') commentId: string) {
        this.service.remove(commentId)
    }
}
