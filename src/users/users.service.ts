import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { UserResponseDTO } from './dto/response-user.dto';

@Injectable()
export class UsersService {
    constructor(private repo: UsersRepository) { }

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
            }
        })

        return UserResponseDTO.from(user)
    }
}
