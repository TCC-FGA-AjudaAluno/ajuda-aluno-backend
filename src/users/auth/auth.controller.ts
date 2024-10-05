import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticateUserDTO } from './dto/authenticate-user.dto';
import { AuthService } from './auth.service';
import { IntrospectTokenDTO } from './dto/introspect-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }

    @Post('token')
    authenticate(@Body() body: AuthenticateUserDTO) {
        return this.service.authenticate(body)
    }

    @Post('introspect')
    async introspect(@Body() data: IntrospectTokenDTO) {
        return this.service.introspect(data.token)
    }
}
