import { Body, Controller, Get, Post, UseGuards, Param, Put, Delete, Headers, Req, Session } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { get, request } from 'http';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultDto } from 'src/dto/result.dto';
import { RequirementCreateDto } from './dto/requirement.create.dto';
import { Requirement } from './requirement.entity';
import { RequirementService } from './requirement.service';


@Controller('request')
export class RequirementController {
  constructor(
    private readonly requirementService: RequirementService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('list')
  async getAll(): Promise<Requirement[]> {
    return this.requirementService.findAll();
  }

  @Get('list/:id')
    async findOne(@Param('id') id: number) {
    return this.requirementService.getById(id);
   }

   @Get('specific')
   async findMany( @Headers() req){
    const hash = req.authorization.slice(7);
    return this.requirementService.findMany(hash);    
   }
  
  @Post('new')
  async create( @Headers() req, @Body() data: RequirementCreateDto): Promise<any>{
    const hash = req.authorization.slice(7);
    return this.requirementService.create(data, hash);
  }
  
  @Put('end/:id')
  async closeReq(@Param('id') id: number): Promise<ResultDto> {
    return this.requirementService.closeReq(id);
    }
 

   @Delete(':id')
   async remove(@Param('id') id: number) {
   return this.requirementService.remove(id);
   }
}