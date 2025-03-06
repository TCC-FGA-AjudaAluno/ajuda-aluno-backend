import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Post } from "../posts.entity"
import { User } from "src/users/user.entity"
import { Vote } from "src/votes/vote.entity"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date

    @Column()
    postId: string

    @Column()
    authorId: string

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn({name: 'postId'})
    post: Post

    @ManyToOne(() => User)
    @JoinColumn({name: 'authorId'})
    author: User

    @OneToMany(() => Vote, vote => vote.comment)
    votes: Array<Vote>
}