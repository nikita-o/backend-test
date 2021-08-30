import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { workDBService } from 'src/standartDB.service'
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    return await this.usersRepository.find({select: ['id', 'name', 'mail', 'phone']});
  }

  async FindById(id: number): Promise<UserDto | undefined> {
    return await this.usersRepository.findOne(id, {select: ['id', 'name', 'mail', 'phone']});
  }

  async findByName(name: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({where: {name}});
  }

  async add(userDto: CreateUserDto): Promise<void | User> {  
    let user: User = this.usersRepository.create({
      name: userDto.name,
      hashPassword: await bcrypt.hash(userDto.password, 10),
      mail: userDto.mail,
      phone: userDto.phone,
    });

    return await this.usersRepository.save(user);
  }  

  // TODO: Удалять также все магазины и продукты?
  async deleteUser(id: number): Promise<void | any> {
    return await this.usersRepository.delete(id);
  }

  async update(id: number, userDto: UpdateUserDto): Promise<void | any> {
    let user: User = this.usersRepository.create({
      name: userDto.name,
      mail: userDto.mail,
      phone: userDto.phone,
    });

    return await this.usersRepository.update(id, user);
  }

  async updatePassword(id: number, newPassword: string): Promise<void | any> {
    let user: User = this.usersRepository.create({
      hashPassword: await bcrypt.hash(newPassword, 10),
    });

    return await this.usersRepository.update(id, user);
  }
}