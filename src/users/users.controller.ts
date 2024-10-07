import { Body, Controller, Get, Logger, Param, Post, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserResponseDTO } from './dto/response-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name)
    constructor(
        private service: UsersService
    ) { }
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

    @UseGuards(AuthGuard)
    @Get(':id')
    async findUser(@Param('id') userId: string) {
        this.logger.log(`Searching for user with id: ${userId}`)
        let user = await this.service.findById(userId)
        return user
    }
}
