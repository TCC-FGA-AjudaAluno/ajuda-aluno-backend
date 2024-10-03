import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: UUID
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
}