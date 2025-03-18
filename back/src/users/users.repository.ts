import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { User } from "src/Entities/user.entity";
import { Repository } from "typeorm";
import { UpdatePfpDto } from "./dto/updatePfp.dto";


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

    async findById(id: string) {
        const user = await this.usersRepository.findOneBy({id})
        return user;
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = this.usersRepository.create({...createUserDto, role:"Client"})
        return await this.usersRepository.save(user)
    }

    
    async updatePhoto(id: string , photoUrl: string) {
    await this.usersRepository.update(id, {profilePhoto: photoUrl})
    return { message: 'Photo updated successfully'}
    }

    async findAll(page: number, limit: number): Promise<User[]> {
        return this.usersRepository.find({
            select:['id', 'name', 'email'],
            take: limit,
            skip: (page - 1) * limit,
        });
    }
}