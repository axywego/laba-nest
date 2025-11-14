import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserWithTasks(@Param('id') id: string): Promise<User> {
    return await this.usersService.findUserWithTasks(+id);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAllUsers();
  }
}