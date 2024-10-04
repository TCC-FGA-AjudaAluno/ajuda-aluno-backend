import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { CreateTokenDTO } from "./dto/create-token.dto";
import { Token } from "./token.entity";

@Injectable()
export class AuthRepository {
    constructor(private manager: EntityManager) { }

    async createToken(data: CreateTokenDTO) {
        let token = await this.manager.save(Token, {
            token: data.token,
            expiresIn: data.expiresIn,
            valid: true,
            user: data.user,
            issuedAt: new Date()
        })

        return token
    }
}