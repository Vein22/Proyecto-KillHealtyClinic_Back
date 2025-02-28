import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({length: 20, nullable: false})
    name: string;

    @Column({length: 15, nullable: false, unique: true})
    email: string;

    @Column({length: 15, nullable: false, unique: true})
    password: string;

    @Column()
    role: string;

    @Column({default: false})
    verified: boolean;
}