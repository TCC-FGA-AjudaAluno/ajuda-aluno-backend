import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EntityManager } from 'typeorm';
import { Subject } from './subjects.entity';
import { CreateSubjectDTO } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
    constructor(private em: EntityManager) {}
    
    async findAll() {
        const [items, total] = await this.em.findAndCount(Subject)
        return items
    }

    async create(data: CreateSubjectDTO) {
        const result = await this.em.save(Subject, data)
        return result
    }
}
