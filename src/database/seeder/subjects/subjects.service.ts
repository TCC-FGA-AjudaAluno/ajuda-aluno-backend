import { Injectable, Logger } from '@nestjs/common';
import { Subject } from 'src/subjects/entities/subjects.entity';
import { EntityManager } from 'typeorm';
import { subjects } from './data';

@Injectable()
export class SubjectsSeederService {
    private readonly logger = new Logger(SubjectsSeederService.name)

    constructor(private em: EntityManager) { }

    async create() {
        try {
            this.logger.log('Begin subjects data seeding...')
            const populatedSubjects = await this.em.find(Subject, {
                select: {
                    name: true,
                    id: true
                }
            })
            const populatedSubjectNames = populatedSubjects.map(item => item.name)
            const toPopulate = subjects.filter(item => !populatedSubjectNames.includes(item.name)).map(item => this.em.create(Subject, item))
            this.logger.log(`Will insert ${toPopulate.length} items.`)
            const result = await this.em.save(toPopulate)
            this.logger.log(`Inserted ${result.length} subjects in the database.`)
        } catch (error) {
            this.logger.error(`Error seeding subjects to database.`, error)
        }
    }
}
