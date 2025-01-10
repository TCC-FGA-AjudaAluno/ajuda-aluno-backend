import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { AuthenticateUserDTO } from './dto/authenticate-user.dto';
import * as jwt from 'jsonwebtoken'
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

        await this.createToken(tokenDto)

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

    private async createToken(data: CreateTokenDTO) {
        // Here we create a JWT Token
        const token = jwt.sign({
            userId: data.user.id,
            email: data.user.email,
            regNum: data.user.registrationNumber,
        }, 'secret-goes-here', {
            expiresIn: data.expiresIn,
            subject: data.user.id
        })

        data.token = token
        return data
    }

    async introspect(token: string, raise: boolean = true) {
        let result = await this.repo.findToken(token)
        if (!result && raise) {
            throw new UnauthorizedException('Invalid Token')
        } else if (!result && !raise) {
            return undefined
        }

        if (raise) delete result.id
        return result
    }

    async validate(token: string): Promise<boolean> {
        let tk = await this.introspect(token, false)
        if (!tk) {
            return false
        }
        let now = new Date()
        let tokenValidityPeriod = new Date(tk.issuedAt.getTime() + (tk.expiresIn * 1000))

        if (now > tokenValidityPeriod) {
            this.repo.invalidateToken(tk.id)
            return false
        }

        return true
    }
}
