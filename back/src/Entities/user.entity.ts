import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({length: 20, nullable: false})
    name: string;

    @Column({length: 15, nullable: false, unique: true})
    email: string;

    @Column({nullable: false, unique: true})
    password: string;

    @Column({nullable: false, unique: true})
    dni: string;

    @Column({nullable: false, unique: true})
    phone: string;

    @Column({nullable: false, unique: true})
    adress: string;

    @Column()
    role: string;

    @Column({nullable: true})
    profilePhoto: string;

    @Column({default: false})
    verified: boolean;
}