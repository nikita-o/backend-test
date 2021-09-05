import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUserDto.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getPage(page: number, count = 10): Promise<User[]> {
    return await this.userRepository.find({
      skip: page * count,
      take: count,
      select: ['id', 'name'],
    });
  }

  async getById(id: number): Promise<User> {
    return await this.userRepository.findOne(id, {
      select: ['id', 'name'],
    });
  }

  async getByName(name: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { name },
      select: ['id', 'name'],
    });
  }

  async update(id: number, userDto: UpdateUserDto): Promise<void> {
    // const user: User = this.userRepository.create({
    //   name: userDto.name,
    // });
    await this.userRepository.update(id, userDto);
  }

  // async updatePassword(newPassword: string): Promise<void> {
  // }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // async getStatistics(): Promise<> {
  // }

  // async getStatisticsInPeriod(): Promise<> {
  // }
}
