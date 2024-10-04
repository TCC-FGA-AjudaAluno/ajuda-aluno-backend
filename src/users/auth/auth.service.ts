import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { AuthenticateUserDTO } from './dto/authenticate-user.dto';
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users.service';
import { FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { User } from '../user.entity';
import { CreateTokenDTO } from './dto/create-token.dto';
import { randomUUID } from 'crypto';
import { AuthRepository } from './auth.repository';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private repo: AuthRepository, private scheduler: SchedulerRegistry) { }
    async authenticate(data: AuthenticateUserDTO) {
        if (!data.email && !data.registrationNumber) {
            throw new UnprocessableEntityException('Missing user email or registrationNumber.')
        }

        let filter: FindOptionsWhere<User> = {}
        if (data.email) filter.email = data.email
        if (data.registrationNumber) filter.registrationNumber = data.registrationNumber

        let user = await this.userService.findOne({
            where: filter
        })
        let result = await bcrypt.compare(data.password, user.password)

        if (!result) {
            throw new UnauthorizedException('Unaithorized')
        }

        let tokenDto = new CreateTokenDTO()
        tokenDto.user = user
        tokenDto.expiresIn = data.expiresIn ?? 600
        tokenDto.token = randomUUID()

        let token = await this.repo.createToken(tokenDto)

        let invalidationCallback = () => {
            this.repo.invalidateToken(token.id)
        }
        let timeout = setTimeout(invalidationCallback, token.expiresIn * 1000)
        this.scheduler.addTimeout(`invalidate#${token.id}`, timeout)

        return {
            accessToken: token.token,
            expiresIn: token.expiresIn
        }
    }
}
