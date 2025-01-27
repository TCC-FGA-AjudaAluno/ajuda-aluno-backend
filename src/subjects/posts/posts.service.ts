import { HttpException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { EntityManager, TypeORMError } from 'typeorm';
import { CreatePostDTO } from './dto/create-post.dto';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
    constructor(private em: EntityManager) {}

    async create(data: CreatePostDTO) {
        try {
            const post = this.em.create(Post, data)
            post.authorId = data.userId
            await this.em.save(Post, post)

            return post
        } catch(e) {
            if (e instanceof TypeORMError) {
                console.log(e)
                throw new UnprocessableEntityException(e)
            }

            throw new InternalServerErrorException('Unexpected Error.')
        }
    }

    async findAll(subjectId: string) {
        const [posts, postsCount] = await this.em.findAndCount(Post, {
            where: {
                subjectId
            },
            relations: {
                author: true
            },
            order: {
                createdAt: "DESC"
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                subjectId: true,
                author: {
                    name: true,
                    email: true,
                    id: true,
                    registrationNumber: true
                }
            },
        })

        console.log(`Found ${postsCount} ${postsCount > 1 || postsCount === 0 ? 'posts' : 'post'}.`)
        return posts
    }
}
