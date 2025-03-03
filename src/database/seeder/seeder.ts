import { Injectable, Logger } from "@nestjs/common";
import { AchievementsSeederService } from "./achievements/achievements.service";
import { SubjectsSeederService } from "./subjects/subjects.service";

@Injectable()
export class Seeder {
    private readonly logger = new Logger(Seeder.name)

    constructor(
        private achievementService: AchievementsSeederService,
        private subjectsService: SubjectsSeederService
    ) {}

    async seed() {
        this.logger.log('Beginning seeding process...')
        try {
            await this.achievementService.create()
            await this.subjectsService.create()
        } catch (error) {
            this.logger.error('Error during seeding process.', error)
        }
    }
}