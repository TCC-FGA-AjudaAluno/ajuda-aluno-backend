import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EntityManager } from 'typeorm';
import { Subject } from './entities/subjects.entity';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { EnrollStudentDTO } from './dto/enroll-student.dto';
import { Enrollment } from './entities/enrollment.entity';
import { User } from 'src/users/user.entity';

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

    async findOne(id: string) {
        const result = await this.em.findOne(Subject, {
            where: {
                id
            }
        })

        if (!result) {
            throw new NotFoundException('Subject not found.')
        }

        return result
    }

    async enroll(data: EnrollStudentDTO) {
        const enrollment = new Enrollment()
        const user = await this.em.findOne(User, {where: {id: data.userId}})
        const subject = await this.em.findOne(Subject, {where: {id: data.subjectId}})

        if (!user || !subject) {
            throw new NotFoundException('User or Subject not found.')
        }

        enrollment.period = data.period

        const result = await this.em.save(Enrollment, enrollment, {
            reload: true
        })
        return result
    }
}
