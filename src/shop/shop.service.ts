import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { workDBService } from 'src/standartDB.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService extends workDBService<Shop> {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {
    super(shopRepository);
  }

  async create(user: User, shop: Shop): Promise<void | number> {
    shop.idOwnerUser = user.id;
    this.shopRepository.save(shop);
  }

  async FindByUserId(id: number): Promise<Shop[]> {
    return await this.shopRepository.find({where: {idOwnerUser: id}});
  }

  // async analiticByUser(user: User) {
  //   let {id} = user;

  // }

  // async analiticByShopId(id: number): Promise<number> {
    
  // }
}
