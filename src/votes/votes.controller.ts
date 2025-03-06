import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/users/auth/auth.decorator';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { User } from 'src/users/user.entity';
import { CreateVote } from './create-vote.dto';
import { VotesService } from './votes.service';

@Controller('votes')
@UseGuards(AuthGuard)
export class VotesController {
    constructor(private service: VotesService) {}
    
    /** A user con only vote for a post or comment per vote. */
    private isVoteValid(data: CreateVote): boolean {
        return (data.commentId && !data.postId) || (data.postId && !data.commentId)
    }

    @Post('upvotes')
    async upvote(@AuthUser() user: User, @Body() body: CreateVote) {
        if (!this.isVoteValid(body)) {
            throw new BadRequestException('Can only vote for a post or a comment per vote.')
        }

        return this.service.vote(body, user, 'UPVOTE')
    }

    @Post('downvotes')
    async downvote(@AuthUser() user: User, @Body() body: CreateVote) {
        if (!this.isVoteValid(body)) {
            throw new BadRequestException('Can only vote for a post or a comment per vote.')
        }

        return this.service.vote(body, user, 'DOWNVOTE')
    }

    async removeVote() {}
}
