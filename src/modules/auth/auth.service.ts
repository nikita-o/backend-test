import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registration(userDto: RegistrationDto): Promise<void> {
    const newUser: User = this.userRepository.create({
      name: userDto.name,
      hashPassword: await bcrypt.hash(userDto.password, 10),
    });

    await this.userRepository.save(newUser).catch((error: QueryFailedError) => {
      throw new HttpException(
        'this name is already taken',
        HttpStatus.CONFLICT,
      );
    });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user: User = await this.userRepository.findOne({
      where: {
        name: username,
      },
    });

    if (user && (await bcrypt.compare(password, user.hashPassword))) {
      delete user.hashPassword;
      return user;
    }
    return null;
  }

  login(user: User): string {
    const payload = { ...user };
    const token: string = this.jwtService.sign(payload);
    return token;
  }
}
