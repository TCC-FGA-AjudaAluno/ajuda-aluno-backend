import { User } from "src/users/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Achievement {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string
    @Column('text')
    description: string
    @Column({nullable: true})
    cover?: string // Icon url?
    @Column({unique: true, nullable: false})
    code: string
    @ManyToMany(() => User, user => user.achievements)
    @JoinTable({name: 'user_achievements'})
    users: User[]
}