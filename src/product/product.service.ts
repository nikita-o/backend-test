import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Product } from './entities/product.entity';



import { Status } from './product.constants';
import { workDBService } from 'src/standartDB.service';
import { TransactionProduct } from './entities/transactionProduct.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(TransactionProduct)
    private transactionRepository: Repository<TransactionProduct>,
  ) {}

  async checkOwner(idProduct: number, idOwner: number): Promise<any> {
    return this.productRepository.findOne(idProduct, {select: ['idOwner']})
    .then((shop: Product) => {
      if (shop.idOwner !== idOwner) 
        throw 'not owner';
    });
  }

  async findAll(): Promise<ProductDto[]> {
    return await this.productRepository.find({select: ['id', 'name', 'cost']});
  }

  async FindById(id: number): Promise<ProductDto | undefined> {
    return await this.productRepository.findOne(id, {select: ['name', 'cost']});
  }

  async add(idUser: number, productDto: CreateProductDto): Promise<void | Product> {
    // FIXME: чекать магазин

    let product: Product = this.productRepository.create({
      name: productDto.name,
      cost: productDto.cost,
      idShop: productDto.idShop,
      idOwner: idUser,
    });

    return await this.productRepository.save(product);
  }

  async findByShopId(idShop: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idShop}});
  }

  // убрать idShop?
  async update(id: number, productDto: UpdateProductDto): Promise<void> {
    const product: Product = this.productRepository.create({
      name: productDto.name,
      cost: productDto.cost,
      idShop: productDto.idShop,
    });

    await this.productRepository.update(id, product);
  }

  async deleteProduct(id: number): Promise<void> {
    this.productRepository.delete(id);
  }

  // купленные товары пользователя
  async findPurchase(userId: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idСustomer: userId, status: Status.sold}});
  }

  // FIXME:
  // корзина пользователя
  async findBasket(idCustomer: number) {
    return await this.transactionRepository.find({where: {idCustomer}});
  }

  // проданные товары пользователя
  async findSold(userId: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idOwner: userId, status: Status.sold}});
  }

  // товары на продажу у пользователя
  async userProduct(idOwner: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idOwner}});
  }

  // товары на подтверждение покупки у пользователя
  async findProofPurchase(userId: number) {
    return await this.transactionRepository.find({where: {idOwner: userId}});
  }

  // покупка
  async purchaseProduct(idCustomer: number, idProduct: number): Promise<void> {
    let {idOwner} = await this.productRepository.findOne(idProduct);
    this.transactionRepository.save({idCustomer, idProduct, idOwner});
  }

  // подтверждение покупки
  async proofPurchase(transactionId: number): Promise<void> {
    let {idCustomer, idProduct} = await this.transactionRepository.findOne(transactionId);
    this.transactionRepository.delete(transactionId);
    this.productRepository.update(idProduct, {status: Status.sold, idСustomer: idCustomer});
  }
}
