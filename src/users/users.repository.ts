import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { EntityManager, QueryFailedError } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersRepository {
    constructor(private manager: EntityManager) { }

    private catchQueryError(e: unknown) {
        if (e instanceof QueryFailedError) {
            throw new UnprocessableEntityException({
                status: 422,
                message: e.message,
                detail: e['detail']
            })
        }
    }

    async create(data: CreateUserDTO): Promise<User> {
        try {
            let user = await this.manager.save(User, {
                course: data.course,
                email: data.email,
                enrollDate: new Date(data.enrollDate),
                name: data.name,
                password: data.password,
                registrationNumber: data.registrationNumber,
            })

            return user
        } catch (e) {
            this.catchQueryError(e)
        }
    }

    async findAll(): Promise<User[]> {
        try {
            let users = await this.manager.find(User)
            return users
        } catch (e) {
            this.catchQueryError(e)
        }
    }
}