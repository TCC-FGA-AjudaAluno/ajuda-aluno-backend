import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { DeepPartial, EntityManager, FindManyOptions, FindOneOptions, QueryFailedError } from "typeorm";
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
                enrollDate: new Date(),
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

    async update(userId: string, user: DeepPartial<User>): Promise<User> {
        try {
            const result = await this.manager.update(User, userId, {
                ...user
            })
            if (!result.affected || result.affected < 1) {
                console.log("foi aqui?")
                throw new NotFoundException("User not found.")
            }

            return this.manager.findOne(User, {
                where: {
                    id: userId
                },
                select: {
                    password: false
                }
            })
        } catch(e) {
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