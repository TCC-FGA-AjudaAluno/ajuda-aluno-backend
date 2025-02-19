import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EntityManager } from 'typeorm';
import { Subject } from './entities/subjects.entity';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { EnrollmentResultDTO, EnrollStudentDTO } from './dto/enroll-student.dto';
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
            },
            relations: {
                posts: true
            }
        })

        if (!result) {
            throw new NotFoundException('Subject not found.')
        }

        return result
    }

    async findEnrolledSubjects(userId: string) {
        const result = await this.em.createQueryBuilder(Subject, 's')
            .distinct(true)
            .innerJoin('s.enrolledStudents', 'e', 'e.userId = :userId', {userId})
            .getMany();


        console.log(result)
        return result
    }

    async enroll(data: EnrollStudentDTO) {
        const enrollment = new Enrollment()
        const user = await this.em.findOne(User, {where: {id: data.userId}})
        const subject = await this.em.findOne(Subject, {where: {id: data.subjectId}})

        if (!user || !subject) {
            throw new NotFoundException('User or Subject not found.')
        }

        enrollment.period = new Date().toISOString()
        enrollment.user = user
        enrollment.subject = subject

        const result = await this.em.save(Enrollment, enrollment, {
            reload: true,
        })

        const enrollmentResult = await this.em.findOne(Enrollment, {
            where: {id: enrollment.id},
            select: {
                id: true,
                period: true,
                user: {
                    id: true
                },
                subject: {
                    id: true
                }
            }
        })

        const dto = new EnrollmentResultDTO()
        dto.id = result.id
        dto.period = result.period
        dto.subjectId = result.subject.id
        dto.userId = result.user.id
        return dto
    }

    async unenroll(subjectId: string, userId: string) {
        const enrollments = await this.em.find(Enrollment, {
            where: {
                subject: {
                    id: subjectId
                },

                user: {
                    id: userId
                },
            },
            relations: {
                subject: true,
                user: true
            }
        })

        const result = await this.em.remove(enrollments)
        return result
    }
}
