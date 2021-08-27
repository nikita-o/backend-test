import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByName(username);
    if (user && user.hashPassword === password) {
      const { hashPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}