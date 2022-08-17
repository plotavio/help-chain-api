import { Injectable, Inject } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(data: UserCreateDto): Promise<ResultDto>{
    let user = new User();
    user.name = data.name;
    user.username = data.username;
    user.password = data.password;
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
}