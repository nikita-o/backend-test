import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findByName(name: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({where: {name}});
  }

  async FindById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne(id);
  }

  async add(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }

  async update(id: number, user: User): Promise<void> {
    await this.usersRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}