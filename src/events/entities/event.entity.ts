import { Subject } from "src/subjects/entities/subjects.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tutoring_events')
export class EventEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column('text', {nullable: true})
    description?: string

    @Column()
    location: string

    @Column()
    start: Date

    @Column()
    end: Date

    @Column()
    userId: string

    @Column()
    subjectId: string

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User

    @ManyToOne(() => Subject)
    @JoinColumn({name: 'subjectId'})
    subject: Subject
}
