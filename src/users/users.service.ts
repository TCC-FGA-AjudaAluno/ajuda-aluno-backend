import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { UserResponseDTO } from './dto/response-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IncreasePointsEvent } from './events/increase-points.event';

@Injectable()
export class UsersService {
    constructor(
        private repo: UsersRepository,
        private emitter: EventEmitter2
    ) { }

    async create(data: CreateUserDTO) {
        delete data.passwordConfirmation
        let salt = await bcrypt.genSalt(10)
        let hashedPass = await bcrypt.hash(data.password, salt)
        data.password = hashedPass
        return this.repo.create(data)
    }

    async findAll() {
        let users = await this.repo.findAll()
        return users.map(user => UserResponseDTO.from(user))
    }

    async findOne(options: FindOneOptions<User>) {
        let user = await this.repo.findOne(options)
        if (!user) {
            throw new NotFoundException('User not found.')
        }

        return user
    }

    async findById(userId: string) {
        let user = await this.findOne({
            where: {
                id: userId
            },
            relations: ['subjects', 'subjects.subject', 'achievements'],
            select: {
                id: true,
                course: true,
                name: true,
                email: true,
                registrationNumber: true,
                points: true,
                enrollDate: true,
                role: true,
                subjects: {
                    id: true,
                    subject: {
                        id: true,
                        name: true,
                        description: true
                    }
                },
                achievements: {
                    id: true,
                    title: true
                }
            },
        })

        return UserResponseDTO.from(user)
    }

    async listUserRanks() {
        const result = await this.repo.listUsersByRank()
        return result
    }

    async updatePoints(user: User, points: number) {
        user.points += points
        const result = await this.repo.update(user.id, user)
        if (result) {
            this.emitter.emit('points.increase', new IncreasePointsEvent(user.id, points))
        }
        return result
    }
}
