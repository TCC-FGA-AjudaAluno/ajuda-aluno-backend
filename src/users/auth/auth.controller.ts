import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticateUserDTO } from './dto/authenticate-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }

    @Post('token')
    authenticate(@Body() body: AuthenticateUserDTO) {
        return this.service.authenticate(body)
    }
}
