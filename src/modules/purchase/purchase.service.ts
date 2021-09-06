import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from 'src/entities/basket.entity';
import { Order } from 'src/entities/order.entity';
import { OrderContent } from 'src/entities/orderContent.entity';
import { Product } from 'src/entities/product.entity';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Basket)
    private basketRepository: Repository<Basket>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderContent)
    private orderContentRepository: Repository<OrderContent>,
  ) {}

  async checkPurchase(userId: number, orderId: number) {
    await this.orderRepository
      .findOneOrFail(orderId, { where: { owner: userId } })
      .catch(() => {
        throw new HttpException('no owner purchase', HttpStatus.CONFLICT);
      });
  }

  async checkShop(userId: number, shopId: number) {
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
    // const product: Product = await this.productRepository.findOneOrFail(
    //   productId,
    // );

    const { rowId }: Basket = await this.basketRepository.findOne({
      where: { shop: shopId, buyer: buyerId, product: productId },
    });
    if (rowId) {
      await this.basketRepository.update(
        { shop: shopId, buyer: buyerId, rowId },
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
    const shop: Shop = await this.shopRepository.findOneOrFail(shopId);
    const buyer: User = await this.userRepository.findOneOrFail(buyerId);
    const baskets: Basket[] = await this.basketRepository.find({
      where: { shop: shop, buyer: buyer },
      relations: ['product'],
    });

    const totalSum: number = baskets.reduce(
      (prev, current) => prev + (<Product>current.product).price * current.count,
      0,
    );
    const order: Order = await this.orderRepository.save({
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
    });
  }

  async showPurchaseShop(shopId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { shop: shopId, checked: false },
      relations: ['ordersContent'],
    });
  }

  async sellerProofPurchase(orderId: number): Promise<void> {
    await this.orderRepository.update(orderId, { checked: true });
  }

  async sellerRejectionPurchase(orderId: number): Promise<void> {
    await this.orderRepository.delete(orderId);
  }

  async showAllPurchaseShop(shopId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { shop: shopId },
      relations: ['ordersContent'],
    });
  }
}
