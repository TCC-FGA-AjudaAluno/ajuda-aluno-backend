import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "../entities/subjects.entity";

@Entity()
export class Material {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    mimetype: string
    @Column()
    path: string
    @Column()
    title: string
    @Column()
    description: string
    @Column()
    authorId: string
    @Column()
    subjectId: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User)
    @JoinColumn({name: 'authorId'})
    author: User
    @ManyToOne(() => Subject)
    @JoinColumn({name: 'subjectId'})
    subject: Subject
}