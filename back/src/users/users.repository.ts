import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { User } from "src/Entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ){}

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOneBy({email})
        return user;
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = this.usersRepository.create({...createUserDto, role:"Client"})
        return this.usersRepository.save(user)
    }

    async findAll(page: number, limit: number): Promise<User[]> {
        return this.usersRepository.find({
            select:['id', 'name', 'email'],
            take: limit,
            skip: (page - 1) * limit,
        });
    }
}