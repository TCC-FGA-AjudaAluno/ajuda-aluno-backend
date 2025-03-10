import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateVote } from './create-vote.dto';
import { User } from 'src/users/user.entity';
import { Vote, VoteType } from './vote.entity';
import { UsersService } from 'src/users/users.service';
import { Comment } from 'src/subjects/posts/comments/comments.entity';
import { Post } from 'src/subjects/posts/posts.entity';

@Injectable()
export class VotesService {
    constructor(private em: EntityManager, private userService: UsersService) {}

    async findTargetAuthor(type: 'comment' | 'post', id: string) {
        const targetEntity = type === 'comment' ? Comment : Post
        const target = await this.em.findOne(targetEntity, {
            where: {id},
            relations: ['author'],
            select: {
                author: {
                    id: true,
                    points: true
                }
            }
        })

        return target.author
    }

    async vote(data: CreateVote, user: User, voteType: keyof typeof VoteType) {
        const {commentId, postId} = data

        let vote = await this.em.findOne(Vote, {where: {userId: user.id, commentId, postId}}) 
        if (!vote) {
            vote = this.em.create(Vote, {
                commentId: data.commentId ?? null,
                postId: data.postId ?? null,
                userId: user.id,
                vote: VoteType[voteType]
            })
        }

        vote.vote = VoteType[voteType]
        const result = await this.em.save(vote)
        const searchId = commentId ?? postId
        const targetType = commentId ? 'comment' : 'post'
        const targetAuthor = await this.findTargetAuthor(targetType, searchId)
        this.userService.updatePoints(targetAuthor, voteType === 'UPVOTE' ? 1 : Math.min(targetAuthor.points, -1))
        return result
    }
}
