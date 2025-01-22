import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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


    @ManyToOne(() => User)
    @JoinColumn({name: 'authorId'})
    author: User

    @ManyToOne(() => Subject, subject => subject.posts)
    @JoinColumn({name: 'subjectId'})
    subject: Subject
}