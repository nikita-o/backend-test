import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { workDBService } from 'src/standartDB.service'

@Injectable()
export class UsersService extends workDBService<User> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async findByName(name: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({where: {name}});
  }

  async add(user: User): Promise<void | User> {  
    // TODO: мб соль добавить?
    user.hashPassword = await bcrypt.hash(user.hashPassword, 10);

     this.usersRepository.save(user)
     .then(user => user.id)
     .catch(e => console.error(e)); // TODO: ловить одиннаковое имя
  }  
}