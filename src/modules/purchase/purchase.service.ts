import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Basket } from 'src/entities/basket.entity';
import { Order } from 'src/entities/order.entity';
import { OrderContent } from 'src/entities/orderContent.entity';
import { Product } from 'src/entities/product.entity';
import { ProductRest } from 'src/entities/productRest.entity';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Basket)
    private basketRepository: Repository<Basket>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ProductRest)
    private productRestRepository: Repository<ProductRest>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderContent)
    private orderContentRepository: Repository<OrderContent>,
  ) {}

  async checkPurchase(userId: number, orderId: number): Promise<void> {
    await this.orderRepository
      .findOneOrFail(orderId, { where: { seller: userId } })
      .catch(e => {
        throw new HttpException('no owner purchase', HttpStatus.CONFLICT);
      });
  }

  async checkShop(userId: number, shopId: number): Promise<void> {
    await this.shopRepository
      .findOneOrFail(shopId, { where: { owner: userId } })
      .catch(e => {
        throw new HttpException('no owner shop', HttpStatus.CONFLICT);
      });
  }

  async addCart(
    shopId: number,
    buyerId: number,
    productId: number,
    count: number,
  ): Promise<void> {
    const basket: Basket = await this.basketRepository.findOne({
      where: { shop: shopId, buyer: buyerId, product: productId },
      select: ['rowId'],
    });

    if (basket?.rowId) {
      await this.basketRepository.update(
        { shop: shopId, buyer: buyerId, rowId: basket.rowId },
        { count },
      );
      return;
    }
    await this.basketRepository.save({
      shop: shopId,
      buyer: buyerId,
      product: { id: productId },
      count,
    });
  }

  async deleteCart(
    shopId: number,
    buyerId: number,
    rowId: number,
  ): Promise<void> {
    this.basketRepository.delete({ shop: shopId, buyer: buyerId, rowId });
  }

  async showCart(shopId: number, buyerId: number): Promise<Basket[]> {
    return await this.basketRepository.find({
      where: { shop: shopId, buyer: buyerId },
      relations: ['product'],
    });
  }

  async buyerProofPurchase(shopId: number, buyerId: number): Promise<void> {
    const shop: Shop = await this.shopRepository.findOneOrFail(shopId, {
      relations: ['owner'],
    });
    const buyer: User = await this.userRepository.findOneOrFail(buyerId);
    const baskets: Basket[] = await this.basketRepository.find({
      where: { shop: shop, buyer: buyer },
      relations: ['product'],
    });

    for (const i of baskets) {
      const product = i.product;
      const { count } = await this.productRestRepository.findOne(
        { shop, product },
        { select: ['count'] },
      );
      if (i.count > count) {
        throw new HttpException(
          `no required quantity for product with id: 
          ${(<Product>i.product).id}`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const totalSum: number = baskets.reduce(
      (prev, cur) => prev + (<Product>cur.product).price * cur.count,
      0,
    );
    const order: Order = await this.orderRepository.save({
      seller: shop.owner,
      shop,
      buyer,
      totalSum,
    });
    baskets.forEach(async basket => {
      await this.orderContentRepository.save({
        order,
        product: <Product>basket.product,
        count: basket.count,
        price: (<Product>basket.product).price,
        sum: (<Product>basket.product).price * basket.count,
      });
      await this.basketRepository.delete({ shop, buyer, rowId: basket.rowId });
    });
  }

  async showPurchaseShop(shopId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { shop: shopId, checked: false },
      relations: ['ordersContent'],
    });
  }

  async sellerProofPurchase(orderId: number): Promise<void> {
    const order: Order = await this.orderRepository.findOne(orderId, {
      relations: ['ordersContent', 'shop'],
    });
    if (order.checked) {
      throw new HttpException(
        'Sale has already been confirmed',
        HttpStatus.CONFLICT,
      );
    }
    const { shop, ordersContent } = order;
    ordersContent.forEach(async (i: OrderContent) => {
      const { product } = await this.orderContentRepository.findOne(
        { order: orderId, rowId: i.rowId },
        { relations: ['product'] },
      );
      const { count } = await this.productRestRepository.findOne(
        { shop, product },
        { select: ['count'] },
      );
      // if (i.count > count) {
      //   throw new HttpException(
      //     `no required quantity for product with id: ${(<Product>i.product).id}`,
      //     HttpStatus.CONFLICT,
      //   );
      // }
      this.productRestRepository.update(
        { shop, product },
        { count: count - i.count },
      );
    });
    await this.orderRepository.update(orderId, { checked: true });
  }

  async sellerRejectionPurchase(orderId: number): Promise<void> {
    const { checked } = await this.orderRepository.findOneOrFail(orderId, {
      select: ['checked'],
    });
    if (checked) {
      throw new HttpException(
        'Sale has already been confirmed',
        HttpStatus.CONFLICT,
      );
    }
    await this.orderRepository.delete(orderId);
  }

  async showAllPurchaseShop(shopId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { shop: shopId },
      relations: ['ordersContent'],
    });
  }
}
