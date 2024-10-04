import { UUID } from "crypto";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user.entity";

@Entity()
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: UUID

    @Column({ unique: true })
    token: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column('timestamp')
    issuedAt: Date

    @Column()
    expiresIn: number

    @Column('boolean')
    valid: boolean
}