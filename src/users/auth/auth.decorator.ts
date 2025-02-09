import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthenticatedRequest } from "./@types/authenticated-request";

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>()
    const auth = request.auth

    if (!auth) {
        throw new UnauthorizedException()
    }

    return auth.user
})