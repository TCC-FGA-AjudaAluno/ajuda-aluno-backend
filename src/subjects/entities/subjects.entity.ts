import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Enrollment } from "./enrollment.entity";

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
}