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

    async invalidateToken(tokenId: string) {
        let result = await this.manager.update(Token, {
            id: tokenId
        }, {
            valid: false
        })

        return result
    }

    async findToken(token: string) {
        return this.manager.findOne(Token, {
            where: {
                token,
                valid: true
            },
            relations: ["user"],
            select: {
                user: {
                    id: true,
                    email: true,
                    name: true,
                    registrationNumber: true,
                    points: false,
                    rank: false
                }
            }
        })
    }
}