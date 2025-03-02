import { Injectable, Logger } from "@nestjs/common";
import { AchievementsSeederService } from "./achievements/achievements.service";

@Injectable()
export class Seeder {
    private readonly logger = new Logger(Seeder.name)

    constructor(private achievementService: AchievementsSeederService) {}

    async seed() {
        this.logger.log('Beginning seeding process...')
        try {
            await this.achievementService.create()
        } catch (error) {
            this.logger.error('Error during seeding process.', error)
        }
    }
}