import { Injectable, Logger } from "@nestjs/common";
import { IncreasePointsEvent } from "src/users/events/increase-points.event";
import { UsersService } from "src/users/users.service";
import { EntityManager } from "typeorm";
import { AchievementsService } from "../achievements.service";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { AchievementCriteria } from "../interfaces/achievement-criteria";

@Injectable()
export class PointsAchievementsListener {
    private readonly logger = new Logger(PointsAchievementsListener.name)

    constructor(
        private em: EntityManager,
        private usersService: UsersService,
        private service: AchievementsService,
        private emitter: EventEmitter2
    ) { }

    private readonly achList: AchievementCriteria[] = [
        {
            code: 'USER_POINTS_100',
            criteria: async (data: IncreasePointsEvent) => {
                const user = await this.findUserByIdWithAchievements(data.userId)
                if (!user) return false
                
                const achs = user.achievements.map(item => item.code)
                if (achs.includes('USER_POINTS_100')) return false

                return user.points >= 100
            },
        },
        {
            code: 'USER_POINTS_250',
            criteria: async (data: IncreasePointsEvent) => {
                const user = await this.findUserByIdWithAchievements(data.userId)
                if (!user) return false

                const achs = user.achievements.map(item => item.code)
                if (achs.includes('USER_POINTS_250')) return false

                return user.points >= 250
            },
        },
        {
            code: 'USER_POINTS_500',
            criteria: async (data: IncreasePointsEvent) => {
                const user = await this.findUserByIdWithAchievements(data.userId)
                if (!user) return false

                const achs = user.achievements.map(item => item.code)
                if (achs.includes('USER_POINTS_500')) return false

                return user.points >= 500
            },
        },
        {
            code: 'USER_POINTS_1000',
            criteria: async (data: IncreasePointsEvent) => {
                const user = await this.findUserByIdWithAchievements(data.userId)
                if (!user) return false

                const achs = user.achievements.map(item => item.code)
                if (achs.includes('USER_POINTS_1000')) return false

                return user.points >= 1_000
            },
        },
    ]

    async findUserByIdWithAchievements(userId: string) {
        return this.usersService.findOne({
            where: {
                id: userId
            },
            relations: {
                achievements: true
            }
        })
    }
    
    @OnEvent('points.increase')
    async handleIncreasedPoints(event: IncreasePointsEvent) {
        this.logger.log(`User with id ${event.userId} won ${event.amount} points.`)
        this.logger.log('Evaluating for achievements')
        const result = await Promise.all(
            this.achList.map(async (item) => {
                return {
                    code: item.code,
                    valid: await item.criteria(event)
                }
            })
        )
        const unlocked = result.filter(item => item.valid).map(item => item.code)
        this.logger.log(unlocked)
        const granted = await Promise.all(unlocked.map(async item => {
            const result = await this.service.addAchievement(item, event.userId)
            return result
        }))

        granted.forEach(item => {
            this.emitter.emit('achievement.unlocked', item)
        })
    }
}