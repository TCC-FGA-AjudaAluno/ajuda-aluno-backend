import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private repo: UsersRepository) { }

    async create(data: CreateUserDTO) {
        return this.repo.create(data)
    }

    async findAll() {
        return this.repo.findAll()
    }
}
