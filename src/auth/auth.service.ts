import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
    constructor(
      private userService: UserService,
      private jwtService: JwtService,
      private tokenService: TokenService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && bcrypt.compareSync(password, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
      async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        const token = this.jwtService.sign(payload);
        this.tokenService.save(token, user.username);
        return {
          access_token: token
        };
      }

      async getPayload(hash: string) {
        const payload = await this.jwtService.decode(hash);
        return payload;
      }
}
