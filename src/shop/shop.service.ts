import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Status } from 'src/product/product.constants';
import { workDBService } from 'src/standartDB.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ShopDto } from './dto/shop.dto';
import { UpdateShopDto } from './dto/updateShop.dto';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    // @InjectRepository(Product)
    // private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<ShopDto[]> {
    return await this.shopRepository.find({select: ['id', 'name', 'idOwnerUser']});
  }
  
  async FindById(id: number): Promise<ShopDto | undefined> {
    return await this.shopRepository.findOne(id, {select: ['id', 'name', 'idOwnerUser']});
  }

  async create(userId: number, shop: Shop): Promise<void | number> {
    shop.idOwnerUser = userId;
    this.shopRepository.save(shop);
  }

  async update(id: number, shopDto: UpdateShopDto): Promise<void> {
    const shop = this.shopRepository.create({
      name: shopDto.name,
    });

    await this.shopRepository.update(id, shop);
  }

  // Удалять все товары?
  async deleteShop(id: number): Promise<void> {
    this.shopRepository.delete(id);
  }

  async FindByUserId(id: number): Promise<Shop[]> {
    return await this.shopRepository.find({where: {idOwnerUser: id}, select: ['id', 'name', 'idOwnerUser']});
  }

  // async analiticByUser(user: User) {
  //   let {id} = user;

  // }

  // async analiticByShopId(idShop: number): Promise<number> {
  //   let product = await this.productRepository.find({where:{idShop}});

  // }
}
