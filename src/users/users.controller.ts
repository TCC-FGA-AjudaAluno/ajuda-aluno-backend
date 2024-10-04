import { Body, Controller, Get, Post, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserResponseDTO } from './dto/response-user.dto';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }
    @Post()
    async createUser(@Body() body: CreateUserDTO) {
        if (body.email !== body.emailConfirmation) {
            throw new UnprocessableEntityException('Mismatching email and emailConfirmation.')
        }

        if (body.password !== body.passwordConfirmation) {
            throw new UnprocessableEntityException('Mismatching password and passwordConfirmation.')
        }

        return UserResponseDTO.from(await this.service.create(body))
    }

    @Get()
    async findAllUsers() {
        return this.service.findAll()
    }
}
