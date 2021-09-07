import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
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

  async statisticsShop(
    shopId: number,
    from: Date,
    after: Date,
  ): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { shop: shopId, updateAt: Between(from, after) },
      relations: ['ordersContent'],
    });
  }

  async statisticsSalesUser(
    userId: number,
    from: Date,
    after: Date,
  ): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { buyer: userId, updateAt: Between(from, after) },
      relations: ['ordersContent'],
    });
  }

  async statisticsPurchaseUser(
    userId: number,
    from: Date,
    after: Date,
  ): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { seller: userId, updateAt: Between(from, after) },
      relations: ['ordersContent'],
    });
  }
}
