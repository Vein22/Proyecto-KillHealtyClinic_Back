import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/Entities/user.entity';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ){}

  async findAll(page: number, limit: number) {
    return this.usersRepository.findAll(page, limit)
  }

  async updatePhoto(id: string, photoUrl: string) {
    const user = await this.usersRepository.findById(id);
    if(!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return await this.usersRepository.updatePhoto(id, photoUrl)
  }
}
