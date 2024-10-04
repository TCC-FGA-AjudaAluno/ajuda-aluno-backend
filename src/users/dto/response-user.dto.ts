import { User } from "../user.entity"

export class UserResponseDTO {
    id: string
    name: string
    course: string
    email: string
    registrationNumber: string
    enrollDate: Date
    points: number

    static from(userEntity: User): UserResponseDTO {
        let user = Object.assign(new UserResponseDTO(), userEntity)
        delete user.password
        delete user.rank
        return user
    }
}