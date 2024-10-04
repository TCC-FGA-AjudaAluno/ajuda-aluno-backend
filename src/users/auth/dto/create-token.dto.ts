import { User } from "src/users/user.entity";

export class CreateTokenDTO {
    user: User
    token: string
    expiresIn: number
}