import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Enrollment } from "./enrollment.entity";
import { Post } from "../posts/posts.entity";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @OneToMany(() => Enrollment, (enrollment) => enrollment.subject)
    enrolledStudents: Enrollment[];

    @OneToMany(() => Post, post => post.subject)
    posts: Post[];
}