import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';



import { Status } from './product.constants';
import { workDBService } from 'src/standartDB.service';

@Injectable()
export class ProductService extends workDBService<Product> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }

  async findByShopId(id: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idShop: id}});
  }

  // купленные товары пользователя
  async findPurchase(userId: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idСustomer: userId, status: Status.sold}});
  }

  // корзина пользователя
  // async findBasket(userId: number): Promise<Product[]> {
  //   //return await this.productRepository.find({where: {idСustomer: userId, status: 1}});
  // }

  // проданные товары пользователя
  async findSold(userId: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idOwner: userId, status: Status.sold}});
  }

  // товары на продажу у пользователя
  async my(userId: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idOwner: userId}});
  }

  // товары на продажу у пользователя
  // async buy(userId: number): Promise<Product[]> {
  //   //return await this.productRepository.find({where: {idOwner: userId}});
  // }

  // товары на подтверждение покупки у пользователя
  async findProofPurchase(userId: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idOwner: userId, status: Status.notСonfirmed}});
  }

  // подтверждение покупки
  proofPurchase(productId: number) {
    this.productRepository.update(productId, {status: Status.sold});
  }


}
