import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { EntityManager, FindManyOptions, FindOneOptions, QueryFailedError } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { User, UserRole } from "./user.entity";

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
                role: data.role as UserRole ?? UserRole.USER
            })

            return user
        } catch (e) {
            this.catchQueryError(e)
        }
    }

    async findAll(options?: FindManyOptions<User>): Promise<User[]> {
        try {
            let users = await this.manager.find(User, options)
            return users
        } catch (e) {
            this.catchQueryError(e)
        }
    }

    async findOne(options: FindOneOptions<User>) {
        return this.manager.findOne(User, options)
    }
}