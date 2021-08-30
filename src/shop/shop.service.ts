import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopDto } from './dto/shop.dto';
import { UpdateShopDto } from './dto/updateShop.dto';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/createShop.dto';
import { Product } from 'src/product/entities/product.entity';
import { Status } from 'src/product/product.constants';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async checkOwner(idShop: number, idOwner: number): Promise<any> {
    return this.shopRepository.findOne(idShop, {select: ['idOwnerUser']})
    .then((shop: Shop) => {
      if (shop.idOwnerUser !== idOwner) 
        throw 'not owner';
    });
  }

  async findAll(): Promise<ShopDto[]> {
    return await this.shopRepository.find({select: ['id', 'name', 'idOwnerUser']});
  }
  
  async FindById(id: number): Promise<ShopDto | undefined> {
    return await this.shopRepository.findOne(id, {select: ['id', 'name', 'idOwnerUser']});
  }

  async create(userId: number, shopDto: CreateShopDto): Promise<void | number> {
    const shop: Shop = this.shopRepository.create({
      name: shopDto.name,
      idOwnerUser: userId,
    });
    this.shopRepository.save(shop);
  }

  async update(id: number, shopDto: UpdateShopDto): Promise<void> {
    const shop: Shop = this.shopRepository.create({
      name: shopDto.name,
    });

    await this.shopRepository.update(id, shop);
  }

  // TODO: Удалять все товары?
  async deleteShop(id: number): Promise<void> {
    this.shopRepository.delete(id);
  }

  async FindByUserId(id: number): Promise<Shop[]> {
    return await this.shopRepository.find({where: {idOwnerUser: id}, select: ['id', 'name', 'idOwnerUser']});
  }

  async getSold(idShop: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idShop, status: Status.sold}});
  }

  async analiticByUser(idUser: number): Promise<any> {
    const products: Product[] = await this.productRepository.find({where:{idOwner: idUser}});
    const productPurchased : Product[] = await this.productRepository.find({where:{idСustomer: idUser}});
    const analitic = {
      countAllProducts: products.length,
      countSellProducts: products.filter(product => product.status === Status.sold).length,
      countFreeProducts: products.filter(product => product.status === Status.free).length,
      proceeds: products.reduce((sum, product) => sum + product.status === Status.sold ? product.cost : 0, 0),
      countPurchasedProducts: productPurchased.length,
      spentMoney: productPurchased.reduce((sum, product) => sum + product.cost, 0),
    }
    return analitic;
  }

  async analiticByShopId(idShop: number): Promise<any> {
    const products: Product[] = await this.productRepository.find({where:{idShop}});
    const analitic = {
      countAllProducts: products.length,
      countSellProducts: products.filter(product => product.status === Status.sold).length,
      countFreeProducts: products.filter(product => product.status === Status.free).length,
      proceeds: products.reduce((sum, product) => sum + product.status === Status.sold ? product.cost : 0, 0),
    }
    return analitic;
  }
}
