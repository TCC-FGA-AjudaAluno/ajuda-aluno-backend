import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { NewPostEvent } from "src/subjects/posts/events/new-post.event";
import { EntityManager } from "typeorm";
import { AchievementCriteria } from "../interfaces/achievement-criteria";
import { UsersService } from "src/users/users.service";
import { AchievementsService } from "../achievements.service";
import { Post } from "src/subjects/posts/posts.entity";
import { Achievement } from "../entities/achievement.entity";

@Injectable()
export class PostAchievementsLister {
    private readonly logger = new Logger(PostAchievementsLister.name)

    constructor(
        private em: EntityManager,
        private usersService: UsersService,
        private service: AchievementsService,
        private emitter: EventEmitter2
    ) {}

    private readonly availableAchievements: AchievementCriteria[] = [
        {
            code: 'POSTS_CREATED_FIRST',
            criteria: async (data: NewPostEvent) => {
                const result = await this.findUserWithPosts(data.authorId)
                if (!result) {
                    return false
                }
                const {user, posts} = result
                const achs = user.achievements.map(item => item.code)
                if (achs.includes('POSTS_CREATED_FIRST')) return false // User already unlocked this achievement
                
                return posts.length >= 1
            }
        },
        {
            code: 'POSTS_CREATED_25',
            criteria: async (data: NewPostEvent) => {
                const result = await this.findUserWithPosts(data.authorId)
                if (!result) {
                    return false
                }
                const { user, posts } = result
                const achs = user.achievements.map(item => item.code)
                if (achs.includes('POSTS_CREATED_25')) return false // User already unlocked this achievement

                return posts.length >= 25
            }
        },
        {
            code: 'POSTS_CREATED_50',
            criteria: async (data: NewPostEvent) => {
                const result = await this.findUserWithPosts(data.authorId)
                if (!result) {
                    return false
                }
                const { user, posts } = result
                const achs = user.achievements.map(item => item.code)
                if (achs.includes('POSTS_CREATED_50')) return false // User already unlocked this achievement

                return posts.length >= 50
            }
        },
        {
            code: 'POSTS_CREATED_100',
            criteria: async (data: NewPostEvent) => {
                const result = await this.findUserWithPosts(data.authorId)
                if (!result) {
                    return false
                }
                const { user, posts } = result
                const achs = user.achievements.map(item => item.code)
                if (achs.includes('POSTS_CREATED_100')) return false // User already unlocked this achievement

                return posts.length >= 100
            }
        }
    ]

    async findUserWithPosts(userId: string) {
        const user = await this.usersService.findOne({ 
            where: { 
                id: userId 
            },
            relations: {
                achievements: true
            }
        })
        if (!user) {
            return null
        }

        const posts = await this.em.find(Post, {
            where: {
                author: user
            }
        })

        return {
            user,
            posts
        }
    }

    @OnEvent('posts.newPost')
    async handleCreatedPosts(event: NewPostEvent) {
        this.logger.log(`User with id ${event.authorId} created post ${event.postId}.`)
        const result = await Promise.all(
            this.availableAchievements.map(async (item) => {
                return {
                    code: item.code,
                    valid: await item.criteria(event)
                }
            })
        )
        const unlocked = result.filter(item => item.valid).map(item => item.code)
        console.log(unlocked)
        const granted = await Promise.all(unlocked.map(async item => {
            const result = await this.service.addAchievement(item, event.authorId)
            return result
        }))

        granted.forEach(item => {
            this.emitter.emit('achievement.unlocked', item)
        })
    }
}