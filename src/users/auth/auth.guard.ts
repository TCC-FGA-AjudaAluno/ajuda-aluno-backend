import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private service: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let request = context.switchToHttp().getRequest<Request>()
        let token = this.getToken(request)
        if (!token) {
            throw new UnauthorizedException()
        }

        const valid = await this.service.validate(token)

        if (valid) {
            const tk = await this.service.introspect(token, false)
            request['auth'] = tk
        }

        return valid
    }

    getToken(request: Request): string | undefined {
        let authHeader = request.headers.authorization
        if (!authHeader) return undefined

        let [type, token] = authHeader.split(' ')
        if (!type && !token) return undefined
        if (type !== 'Bearer') return undefined

        return token
    }
}