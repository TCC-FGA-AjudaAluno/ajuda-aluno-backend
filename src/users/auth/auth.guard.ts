import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private service: AuthService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let request = context.switchToHttp().getRequest<Request>()
        let token = this.getToken(request)
        if (!token) {
            throw new UnauthorizedException()
        }

        return this.service.validate(token)
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