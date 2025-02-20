import { HttpException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { DeepPartial, EntityManager, TypeORMError } from 'typeorm';
import { CreatePostDTO } from './dto/create-post.dto';
import { Post } from './posts.entity';
import { PostListItem } from './dto/post-list-item.dto';
import { Comment } from './comments/comments.entity';
import { Vote } from 'src/votes/vote.entity';
import { CommentListItem } from './dto/comment-list-item.dto';
import { PostWithCommentsDTO } from './dto/post-with-comments.dto';

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

    async findPostsWithCommentsAndVoteCount(subjectId: string, userId: string): Promise<Array<PostListItem>> {
        /**
         * Receives the subject the posts belong to, and the user requesting the resource to find the votes.
         */

        const rawResult = await this.em.createQueryBuilder()
            .select(`
                p.id,
                p.title,
                p.content,
                p."createdAt",
                p."authorId",
                u.name as author,
                u.email,
                u.registrationNumber,
                uv.vote,
                coalesce(c.comments, 0)::int as comments,
                coalesce(v.upvotes, 0)::int as upvotes,
                coalesce(v.downvotes, 0)::int as downvotes
            `)
            .from(Post, 'p')
            .leftJoin('p.author', 'u') // join users
            .leftJoin(q => {
                return q.select('c."postId", count(*)::int as comments')
                    .from(Comment, 'c')
                    .groupBy('c."postId"')
            }, 'c', 'c."postId" = p.id') // join comment count
            .leftJoin(q => {
                return q.select([
                        'v."postId"',
                        "count(v.id) filter (where v.vote = 'UPVOTE')::int as upvotes",
                        "count(v.id) filter (where v.vote = 'DOWNVOTE')::int as downvotes"
                    ])
                    .from(Vote, 'v')
                    .groupBy('v."postId"')
            }, 'v', 'v."postId" = p.id') // join votes to get count
            .leftJoin(q => {
                return q.select()
                    .from(Vote, 'v')
                    .where('v."userId" = :userId', {userId})
            }, 'uv', 'uv."postId" = p.id') // join votes that user did
            .where('p."subjectId" = :subjectId', {subjectId})
            .orderBy('p."createdAt"', 'DESC')
            .addOrderBy('v.upvotes', 'DESC')
            .getRawMany()

        return rawResult.map(i => {
            return {
                id: i.id,
                title: i.title,
                content: i.content,
                createdAt: i.createdAt,
                author: {
                    id: i.authorId,
                    name: i.author,
                    email: i.email,
                    registrationNumber: i.registrationNumber
                },
                vote: i.vote,
                comments: i.comments,
                upvotes: i.upvotes,
                downvotes: i.downvotes
            }
        })
    }

    async findPostsWithCommentsCount(subjectId: string): Promise<Array<PostListItem>> {
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
            .where('p.subjectId = :subject_id', {subject_id: subjectId})
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

    async findAll(subjectId: string, userId: string) {
        const posts = await this.findPostsWithCommentsAndVoteCount(subjectId, userId)
        // const posts = await this.findPostsWithCommentsCount(subjectId)
        return posts
    }

    async findPostCommentsWithVotes(postId: string, userId: string): Promise<CommentListItem[]> {
        const result = await this.em.createQueryBuilder(Comment, 'c')
            .select(`
                c.id,
                c.content,
                c."createdAt",
                c."authorId",
                u.name as "authorName",
                v.vote,
                coalesce(v2.upvotes, 0)::int as upvotes,
                coalesce(v2.downvotes, 0)::int as downvotes
            `)
            .leftJoin('c.author', 'u') // join with authors
            .leftJoin(q => {
                return q.from(Vote, 'v')
                    .select()
                    .where('v.userId = :userId', {userId})
            }, 'v', 'v."commentId" = c.id') // getting what comments the user liked
            .leftJoin(q => {
                return q.from(Vote, 'v')
                    .select([
                        'v."commentId"',
                        "count(v.id) filter (where v.vote = 'UPVOTE')::int as upvotes",
                        "count(v.id) filter (where v.vote = 'DOWNVOTE')::int as downvotes",
                    ])
                    .groupBy('v."commentId"')
            }, 'v2', 'v2."commentId" = c.id') // get upvotes and downvotes count
            .where('c."postId" = :postId', {postId})
            .orderBy('c."createdAt"', 'DESC')
            .addOrderBy('v2.upvotes', 'DESC')
            .getRawMany()

        return result.map(i => {
            return {
                id: i.id,
                content: i.content,
                author: {
                    id: i.authorId,
                    name: i.authorName
                },
                vote: i.vote,
                upvotes: i.upvotes,
                downvotes: i.downvotes,
                createdAt: i.createdAt
            }
        })
    }

    async findOne(postId: string, userId: string): Promise<PostWithCommentsDTO> {
        const result = await this.em.findOne(Post, {
            where: {
                id: postId
            },
            relations: ['author'],
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
            }
        })

        const commentsWithVotes = await this.findPostCommentsWithVotes(postId, userId)

        return {
            ...result,
            comments: commentsWithVotes
        }
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
