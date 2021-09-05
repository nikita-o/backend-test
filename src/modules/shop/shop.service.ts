import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dto/createShopDto.dto';
import { UpdateShopDto } from './dto/updateShopDto.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async create(shopDto: CreateShopDto, owner: User): Promise<void> {
    const shop: Shop = this.shopRepository.create({
      ...shopDto,
      owner,
    });
    this.shopRepository.save(shop);
  }

  async getPage(page: number, count = 10): Promise<Shop[]> {
    return await this.shopRepository.find({
      skip: page * count,
      take: count,
      select: ['id', 'name'],
    });
  }

  // async getPageByUser(page: number, count = 10): Promise<Shop[]> {
  //   return await this.shopRepository.find({
  //     skip: page * count,
  //     take: count,
  //     select: ['id', 'name'],
  //   });
  // }

  async getById(id: number): Promise<Shop> {
    return await this.shopRepository.findOne(id, {
      select: ['id', 'name'],
    });
  }

  async getByName(name: string): Promise<Shop[]> {
    return await this.shopRepository.find({
      where: { name },
      select: ['id', 'name'],
    });
  }

  async update(id: number, userDto: UpdateShopDto): Promise<void> {
    // const user: User = this.shopRepository.create({
    //   name: userDto.name,
    // });
    await this.shopRepository.update(id, userDto);
  }

  async delete(id: number): Promise<void> {
    await this.shopRepository.delete(id);
  }

  // async getStatistics(): Promise<> {
  // }

  // async getStatisticsInPeriod(): Promise<> {
  // }
}
