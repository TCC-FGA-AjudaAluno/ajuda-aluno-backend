import { HttpException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { DeepPartial, EntityManager, TypeORMError } from 'typeorm';
import { CreatePostDTO } from './dto/create-post.dto';
import { Post } from './posts.entity';
import { PostListItem } from './dto/post-list-item.dto';

@Injectable()
export class PostsService {
    constructor(private em: EntityManager) { }

    async create(data: CreatePostDTO) {
        try {
            const post = this.em.create(Post, data)
            post.authorId = data.userId
            await this.em.save(Post, post)

            return post
        } catch (e) {
            if (e instanceof TypeORMError) {
                console.log(e)
                throw new UnprocessableEntityException(e)
            }

            throw new InternalServerErrorException('Unexpected Error.')
        }
    }

    async findPostsWithCommentsCount(): Promise<Array<PostListItem>> {
        const rawPostsWithComments = await this.em.createQueryBuilder(Post, 'p')
            .leftJoinAndSelect('p.author', 'author')
            .leftJoinAndSelect('p.comments', 'c')
            .select([
                'p.id as post_id',
                'p.title as title',
                'p.createdAt as created_at',
                'p.content',
                'author.id as author_id',
                'author.name',
                'author.email',
                'author.registrationNumber as registration_number',
                'count(c.id) as comments'])
            .groupBy('post_id')
            .addGroupBy('title')
            .addGroupBy('created_at')
            .addGroupBy('author_id')
            .addGroupBy('author.name')
            .addGroupBy('author.email')
            .addGroupBy('registration_number')
            .addGroupBy('p.content')
            .orderBy('created_at', 'DESC')
            .getRawMany()

        return rawPostsWithComments.map(item => {
            const dto = new PostListItem()
            dto.id = item['post_id']
            dto.title = item['title']
            dto.createdAt = item['created_at']
            dto.content = item['p_content']
            dto.author = {
                id: item['author_id'],
                email: item['author_email'],
                name: item['author_name'],
                registrationNumber: item['registration_number']
            }
            dto.comments = +item['comments']

            return dto
        })
    }

    async findAll(subjectId: string) {
        const posts = await this.findPostsWithCommentsCount()
        return posts
    }

    async findOne(postId: string) {
        const result = await this.em.findOne(Post, {
            where: {
                id: postId
            },
            relations: ['author', 'comments', 'comments.author'],
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
                },
                comments: {
                    id: true,
                    content: true,
                    createdAt: true,
                    author: {
                        id: true,
                        name: true
                    }
                }
            },
            order: {
                createdAt: 'DESC',
                comments: {
                    createdAt: 'DESC'
                },
            }
        })

        return result
    }

    async update(postId: string, data: DeepPartial<Post>) {
        try {
            const result = await this.em.update(Post, postId, data)

            console.log(result)

            const post = await this.em.findOne(Post, { where: { id: postId } })
            return post
        } catch (e) {
            if (e instanceof TypeORMError) {
                console.log(e)
                throw new UnprocessableEntityException(e)
            }

            throw new InternalServerErrorException('Unexpected Error.')
        }
    }

    async remove(postId: string) {
        const post = await this.em.findOne(Post, {
            where: {
                id: postId
            }
        })

        return this.em.remove(post)
    }
}
