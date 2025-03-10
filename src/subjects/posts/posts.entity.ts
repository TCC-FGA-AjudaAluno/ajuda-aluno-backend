import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Subject } from "../entities/subjects.entity";
import { Comment } from "./comments/comments.entity";
import { Vote } from "src/votes/vote.entity";

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

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @OneToMany(() => Vote, vote => vote.post)
    votes: Array<Vote>
}