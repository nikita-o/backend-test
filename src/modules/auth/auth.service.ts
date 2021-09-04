import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registration(userDto: RegistrationDto): Promise<number> {
    const newUser: User = this.userRepository.create({
      name: userDto.name,
      hashPassword: await bcrypt.hash(userDto.password, 10),
    });

    return (await this.userRepository.save(newUser)).id;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user: User = await this.userRepository.findOne({
      where: {
        name: username,
      },
    });

    if (user && (await bcrypt.compare(password, user.hashPassword))) {
      const { hashPassword, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: User): string {
    const payload = { username: user.name, sub: user.id };
    const token: string = this.jwtService.sign(payload);
    return token;
  }
}
