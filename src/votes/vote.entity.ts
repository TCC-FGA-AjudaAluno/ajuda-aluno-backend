import { Comment } from "src/subjects/posts/comments/comments.entity"
import { Post } from "src/subjects/posts/posts.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

export enum VoteType {
    UPVOTE = 'UPVOTE',
    DOWNVOTE = 'DOWNVOTE'
}

@Entity('votes')
export class Vote {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({type: 'enum', enum: VoteType})
    vote: VoteType
    @Column()
    userId: string
    @Column({nullable: true})
    commentId?: string
    @Column({nullable: true})
    postId?: string
    @ManyToOne(() => Comment, comment => comment.votes)
    @JoinColumn({name: 'commentId'})
    comment?: Comment
    @ManyToOne(() => Post, post => post.votes)
    @JoinColumn({name: 'postId'})
    post?: Post
}