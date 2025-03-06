import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(    
    private readonly usersRepository: UsersRepository
  ) {}

  async passwordEncrypter(password: string) {
    const hashedPassword = bcrypt.hash(password, 10)
    if (!hashedPassword) {
      throw new BadRequestException('Password could not be hash')
    }
    return hashedPassword;
  }

  async createUser(createUserDto: CreateUserDto) {
    const dbUser = await this.usersRepository.findByEmail(createUserDto.email)
    if(dbUser) {
      throw new BadRequestException('Email already exist');
    }

    if(createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('Password do not match')
    }

    const hashedPassword = await this.passwordEncrypter(createUserDto.password)

    this.usersRepository.createUser({...createUserDto, password: hashedPassword})
    return 'User created successfully';
  }

  
  async login(email, password) {
    const dbUser = await this.usersRepository.findByEmail(email)

    if(!dbUser) {
      throw new BadRequestException('Invalid Credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.password)

    if(!isPasswordValid) {
      throw new BadRequestException('Invalid Credentials')
    }
  }
}
