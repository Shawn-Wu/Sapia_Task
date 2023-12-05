import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { TokenGuard } from 'src/token/token.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':user_name')
  @UseGuards(TokenGuard)
  async findOne(@Param('user_name') user_name: string): Promise<User> {
    return this.usersService.findOne(user_name);
  }

  @Post()
  async create(@Body() createCatDto) {
    await this.usersService.create(createCatDto);
  }

  @Get()
  @UseGuards(TokenGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
