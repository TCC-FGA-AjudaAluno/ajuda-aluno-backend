import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { FindOneOptions } from 'typeorm';
import { User } from './user.entity';

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
        return this.repo.findAll()
    }

    async findOne(options: FindOneOptions<User>) {
        let user = await this.repo.findOne(options)
        if (!user) {
            throw new NotFoundException('User not found.')
        }

        return user
    }
}
