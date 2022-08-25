import { Injectable, Inject } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Requirement } from 'src/requirement/requirement.entity';
import { Repository } from 'typeorm';
import { ReqResponseCreateDto } from './dto/reqResponse.create.dto';
import { ReqResponse } from './reqResponse.entity';


@Injectable()
export class ReqResponseService {
  constructor(
    @Inject('REQRESPONSE_REPOSITORY')
    private reqResponseRepository: Repository<ReqResponse>,   
  ) {}

  async findAll(): Promise<ReqResponse[]> {
    return this.reqResponseRepository.find();
  }

  async getById(id: number){
    return this.reqResponseRepository.findOneBy({id: id}); 
  }

  async create(data: ReqResponseCreateDto, username: string) {
    
     let response = new ReqResponse();
     response.username = username;
     response.comment = data.comment;
     response.responseTime = new Date();
     return this.reqResponseRepository.save(response)

  }

  async remove(id: number){
    return this.reqResponseRepository.delete(id)
  }
  
 
}