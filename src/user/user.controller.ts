import { Body, Controller, Get, Post, UseGuards, Request, Param, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultDto } from 'src/dto/result.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { UserPasswordDto } from './dto/user.password.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('list/:id')
    async findOne(@Param('id') id: number) {
    return this.userService.getById(id);
   }
  
  @Post('new')
  async create(@Body() data: UserCreateDto): Promise<any>{
    return this.userService.create(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
   async update(@Param('id') id: number, @Body() updateUserDto: UserUpdateDto): Promise<ResultDto> {
   return this.userService.update(id, updateUserDto);
   }

   @UseGuards(JwtAuthGuard)
   @Put('pass/:id')
   async updatePassword(@Param('id') id: number, @Body() updatePasswordDto: UserPasswordDto): Promise<ResultDto> {
   return this.userService.updatePassword(id, updatePasswordDto);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':id')
   async remove(@Param('id') id: number) {
   return this.userService.remove(id);
   }
}