import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatistikService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async checkShop(userId: number, shopId: number) {
    await this.shopRepository
      .findOneOrFail(shopId, { where: { owner: userId } })
      .catch(e => {
        throw new HttpException('no owner shop', HttpStatus.CONFLICT);
      });
  }

  async checkProduct(userId: number, productId: number) {
    await this.productRepository
      .findOneOrFail(productId, { where: { owner: userId } })
      .catch(e => {
        throw new HttpException('no owner product', HttpStatus.CONFLICT);
      });
  }

  async statisticsShop(shopId: number): Promise<any> {
    return {};
  }

  async statisticsSalesUser(userId: number): Promise<any> {
    return {};
  }

  async statisticsPurchaseUser(userId: number): Promise<any> {
    return {};
  }

  async statisticsSalesProduct(productId: number): Promise<any> {
    return {};
  }
}
