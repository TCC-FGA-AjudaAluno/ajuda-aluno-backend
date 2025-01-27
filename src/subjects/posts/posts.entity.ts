import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Subject } from "../entities/subjects.entity";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column('text')
    content: string

    @Column()
    authorId: string

    @Column()
    subjectId: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User)
    @JoinColumn({name: 'authorId'})
    author: User

    @ManyToOne(() => Subject, subject => subject.posts)
    @JoinColumn({name: 'subjectId'})
    subject: Subject
}