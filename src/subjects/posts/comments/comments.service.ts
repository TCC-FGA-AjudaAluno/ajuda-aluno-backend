import { Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { EntityManager, TypeORMError } from 'typeorm';
import { Comment } from './comments.entity';
import { CreateCommentDTO } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(private em: EntityManager) {}

    async create(data: CreateCommentDTO) {
        try {
            if (!data.authorId) {
                throw new UnprocessableEntityException("Invalid comment author.")
            }

            const comment = new Comment()
            this.em.merge(Comment, comment, data)
            const result = await this.em.save(Comment, comment)

            return result
        } catch (e) {
            if (e instanceof TypeORMError) {
                throw new UnprocessableEntityException(e)
            }

            throw new InternalServerErrorException(e)
        }
    }

    async remove(commentId: string) {
        const comment = await this.em.findOne(Comment, {
            where: {
                id: commentId
            }
        })

        await this.em.remove(comment)
    }
}
