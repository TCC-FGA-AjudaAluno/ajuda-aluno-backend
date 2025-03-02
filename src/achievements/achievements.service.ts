import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Achievement } from './entities/achievement.entity';
import { AchievementListItem } from './dto/achievement-list.dto';

@Injectable()
export class AchievementsService {
    constructor (private em: EntityManager) {}

    async findAllWithUnlocked(userId: string): Promise<AchievementListItem[]> {
        const result = await this.em.createQueryBuilder(Achievement, 'a')
            .leftJoin(qr => {
                return qr.from('user_achievements', 'ua')
                  .where('ua."userId" = :userId', {userId})
                  .select('*')  
            }, 'ua', 'ua."achievementId" = a.id')
            .select(`
                a.id ,
                a.title,
                a.description,
                a.code,
                a.cover,
                (ua."userId" is not null) as unlocked
            `)
            .getRawMany()
        return result.map(item => {
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                cover: item.cover,
                unlocked: item.unlocked
            }
        })
    }

    async findAll(userId?: string) {
        if (userId) {
            return this.findAllWithUnlocked(userId)
        }
        const result = await this.em.find(Achievement, {select: {id: true, title: true, description: true, cover: true}})        
        return result
    }
}
