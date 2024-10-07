import { Request } from "express"
import { User } from "src/users/user.entity"

interface AuthenticatedData {
    auth: {
        token: string
        issuedAt: Date
        valid: boolean
        user: User
    }
}

export type AuthenticatedRequest = AuthenticatedData & Request