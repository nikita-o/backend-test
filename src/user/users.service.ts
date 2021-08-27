import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

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

  async add(user: User): Promise<void | number> {  
    // TODO: мб соль добавить?
    user.hashPassword = await bcrypt.hash(user.hashPassword, 10);

     this.usersRepository.save(user)
     .then(user => user.id)
     .catch(e => console.error(e));
  }

  async update(id: number, user: User): Promise<void> {
    await this.usersRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}