import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./subjects.entity";

@Entity()
export class Enrollment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    period: string

    @ManyToOne(() => User, (user) => user.subjects)
    @JoinColumn({ name: 'userId' })
    user: User

    @ManyToOne(() => Subject, (subject) => subject.enrolledStudents)
    @JoinColumn({ name: 'subjectId' })
    subject: Subject
}