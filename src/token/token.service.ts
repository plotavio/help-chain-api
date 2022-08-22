import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ResultDto } from 'src/dto/result.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async save(hash: string, username: string){
    let objToken = await this.tokenRepository.findOneBy({ username: username})
    if(objToken){
      this.tokenRepository.update(objToken.id, {
        hash: hash,
      })

    }else{
    this.tokenRepository.insert({
      hash: hash,
      username: username,
    })
    }

  }

  async refreshToken(oldToken: string){
    let objToken = await this.tokenRepository.findOneBy({ hash: oldToken}) 
    if(objToken){
      let user = await this.userService.findOne(objToken.username)
      return this.authService.login(user)
    }else{
      return new HttpException({
        errorMessage: 'Invalid token'
      },HttpStatus.UNAUTHORIZED)
    }  
  }
 
}