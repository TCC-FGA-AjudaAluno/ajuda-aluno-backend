import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    course: string

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ unique: true })
    registrationNumber: string

    @Column({ default: 0, nullable: true })
    points: number = 0

    @Column({ default: -1, nullable: true })
    rank: number = -1

    @Column('date')
    enrollDate: Date

    @Column({ enum: UserRole, type: 'enum', default: UserRole.USER })
    role: UserRole
}
