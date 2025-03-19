import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/roles/roles.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  @Roles(Role.Admin, Role.Doctor)
  @UseGuards(AuthGuard, RolesGuard)
  async findAll(@Query('page') page: number=1, @Query('limit') limit: number=5) {
    return this.usersService.findAll(page, limit);
  }
}
