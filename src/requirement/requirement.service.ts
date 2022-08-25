import { Injectable, Inject } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import { Requirement } from './requirement.entity';
import { RequirementCreateDto } from './dto/requirement.create.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';


@Injectable()
export class RequirementService {
  constructor(
    @Inject('REQUIREMENT_REPOSITORY')
    private requirementRepository: Repository<Requirement>,
    private authService: AuthService,
    private userService: UserService    
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

  async closeReq(id: number){
    const endTime = new Date();
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