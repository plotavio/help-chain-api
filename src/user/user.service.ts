import { Injectable, Inject } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserPasswordDto } from './dto/user.password.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number){
    return this.userRepository.findOneBy({id: id});
    
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({username: username});
  }

  async create(data: UserCreateDto): Promise<ResultDto>{
    let user = new User();
    user.name = data.name;
    user.username = data.username;
    user.password = bcrypt.hashSync(data.password, 8);
    user.country = data.country;
    user.department = data.department;
    user.type = data.type;
    return this.userRepository.save(user)
    .then((result) => {
        return <ResultDto>{
            status: true,
            message: 'Success!'
        }

    })
    .catch((error) => {
        return <ResultDto>{
            status: false,
            message: 'Your requisition failed!'
        }

    })

  }

  async update(id: number, UserUpdateDto){
    return this.userRepository
    .update(id, UserUpdateDto)
    .then((result) => {
      return <ResultDto>{
        status:true,
        message:'Success!'
      }
    })
    .catch((error) => {
      console.log(error);
      return <ResultDto>{
        status:false,
        message:"Coudn't update user"
        
      };
    }) 
  }

  async updatePassword(id: number,data: UserPasswordDto){
    const password = bcrypt.hashSync(data.password, 8);
    return this.userRepository.update(id, {
      password: password,
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
    return this.userRepository.delete(id)
  }
  
 
}