import { Injectable, Logger } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { achievements } from "./data";
import { Achievement } from "src/achievements/entities/achievement.entity";

@Injectable()
export class AchievementsSeederService {
    private readonly logger = new Logger(AchievementsSeederService.name)
    constructor(private em: EntityManager) {}

    async create() {
        this.logger.log('Begin achievement seeding...')

        this.logger.log('Find already populated achievements.')
        const populatedData = await this.em.find(Achievement, {select: {code: true}})
        const populatedCodes = populatedData.map(item => item.code)
        const toPopulateYet = achievements.filter(item => !populatedCodes.includes(item.code))

        try {
            this.logger.log(`Populating ${toPopulateYet.length} items`)
            this.logger.log('Seeding achievement data...')
            const entitites = toPopulateYet.map(item => this.em.create(Achievement, item))
            const result = await this.em.save(entitites)
            this.logger.log(`Populated ${result.length} items.`)
        } catch (error) {
            this.logger.error('Error during achievements seeding process.', error)
        }
    }
}