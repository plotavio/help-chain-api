import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  
  @Post('new')
  async create(@Body() data: UserCreateDto): Promise<any>{
    return this.userService.create(data);
  }
}