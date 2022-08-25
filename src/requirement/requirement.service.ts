import { Injectable, Inject } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import { Requirement } from './requirement.entity';
import { RequirementCreateDto } from './dto/requirement.create.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { error } from 'console';
import { ReqResponseCreateDto } from 'src/reqResponse/dto/reqResponse.create.dto';
import { ReqResponseService } from 'src/reqResponse/reqResponse.service';


@Injectable()
export class RequirementService {
  constructor(
    @Inject('REQUIREMENT_REPOSITORY')
    private requirementRepository: Repository<Requirement>,
    private authService: AuthService,
    private userService: UserService,
    private reqResponseService: ReqResponseService    
  ) {}

  async findAll(): Promise<Requirement[]> {
    return this.requirementRepository.find();
  }

  async getById(id: number){
    return this.requirementRepository.findOneBy({id: id}); 
  }

  async findMany(hash: string): Promise<Requirement[]> {
    const payload = await this.authService.getPayload(hash)
    const user = await this.userService.getById(Number(payload.sub))
    // return this.requirementRepository.findBy({type: user.type, sector: user.department, endTime: null})
    return this.requirementRepository.createQueryBuilder('requirement')
    .where('requirement.type = :type',{ type: user.type })
    .andWhere('requirement.sector = :department',{ department: user.department })
    .andWhere('requirement.endTime is null')
    .getMany()
  }

  async create(data: RequirementCreateDto, hash: string): Promise<ResultDto>{
    const payload = await this.authService.getPayload(hash)
    const user = await this.userService.getById(Number(payload.sub))
    
     let request = new Requirement();
     request.name = data.name;
     request.description = data.description;
     request.type = data.type;
     request.startTime = new Date();
     request.sector = user.department;
     request.user = user;
     return this.requirementRepository.save(request)
     .then((result) => {
       return <ResultDto>{
         status: true,
              message: 'Success!'
         }

      })
      .catch((error) => {
        console.log(error)
          return <ResultDto>{
              status: false,
             message: 'Your requisition failed!'
         }

      })

  }

  async respondReq(id: number, data: ReqResponseCreateDto, hash: string){
    const requirement = await this.requirementRepository.createQueryBuilder('requirement')
    .where('requirement.id = :id',{ id: id })
    .andWhere('requirement.reqResponseId is not null')
    .getOne()
    if(requirement){
      return <ResultDto>{
        status:false,
        message:'Requirement has already been responded'}      
    }
    const payload = await this.authService.getPayload(hash);
    const user = await this.userService.getById(Number(payload.sub)); 
    const response = await this.reqResponseService.create(data, user.username)
    return this.requirementRepository.update(id, {
       reqResponse: response,
     })
     .then((result) => {
       return <ResultDto>{
         status:true,
         message:'Sucesso!'
       }
     })
     .catch((error) => {
       console.log(error);
       return <ResultDto>{
         status:false,
         message:'Deu Ruim'
        
       };
     }) 
  }

  async closeReq(id: number){
    const endTime = new Date();
    const requirement = await this.requirementRepository.createQueryBuilder('requirement')
    .where('requirement.id = :id',{ id: id })
    .andWhere('requirement.endTime is not null')
    .getOne()
    if(requirement){
      return <ResultDto>{
        status:false,
        message:'Requirement is already closed'}
    }
    return this.requirementRepository.update(id, {
      endTime: endTime,
    })
    .then((result) => {
      return <ResultDto>{
        status:true,
        message:'Sucesso!'
      }
    })
    .catch((error) => {
      console.log(error);
      return <ResultDto>{
        status:false,
        message:'Deu Ruim'
        
      };
    }) 
  }

  

  async remove(id: number){
    return this.requirementRepository.delete(id)
  }
  
 
}