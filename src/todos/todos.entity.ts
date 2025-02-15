import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column({nullable: true})
    description?: string

    @Column()
    dueDate: Date

    @CreateDateColumn()
    createdAt: Date

    @Column()
    userId: string

    @Column('bool', {default: false})
    done: boolean

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User
}