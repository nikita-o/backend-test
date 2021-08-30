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
import { Shop } from 'src/shop/entities/shop.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(TransactionProduct)
    private transactionRepository: Repository<TransactionProduct>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
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
    const shop: Shop = await this.shopRepository.findOne(productDto.idShop, {select: ['idOwnerUser']});
    if (idUser !== shop?.idOwnerUser)
      throw 'not owner.'


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

  // TODO: убрать idShop?
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

  // корзина пользователя
  async findBasket(idCustomer: number): Promise<Product[]> {
    const products: TransactionProduct[] = await this.transactionRepository.find({where: {idCustomer}, select: ['idProduct']});
    return await this.productRepository.findByIds(products.map(product => product.idProduct));
  }

  // товары на подтверждение покупки у пользователя
  async findProofPurchase(idOwner: number) {
    const products: TransactionProduct[] =  await this.transactionRepository.find({where: {idOwner}, select: ['idProduct', 'id']});
    return products;
    // const idProducts = products.map(product => product.idProduct);
    // const idTransaction = products.map(product => product.id);
    // return (await this.productRepository.findByIds(idProducts));
  }

  // купленные товары пользователя
  async findPurchase(idСustomer: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idСustomer, status: Status.sold}});
  }

  // проданные товары пользователя
  async findSold(idOwner: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idOwner, status: Status.sold}});
  }

  // товары на продажу у пользователя
  async userProducts(idOwner: number): Promise<Product[]> {
    return await this.productRepository.find({where: {idOwner, status: Status.free}});
  }

  // покупка
  async purchaseProduct(idCustomer: number, idProduct: number): Promise<void> {
    let {idOwner} = await this.productRepository.findOne(idProduct);
    await this.transactionRepository.save({idCustomer, idOwner, idProduct});
  }

  // подтверждение покупки
  async proofPurchase(transactionId: number, idOwner: number): Promise<void> {
    
    console.log(transactionId);
    let transaction: TransactionProduct = await this.transactionRepository.findOne(transactionId);
    if (transaction.idOwner !== idOwner)
      throw 'not owner.';

    const products: TransactionProduct[] =  await this.transactionRepository.find({where: {idProduct: transaction.idProduct}, select: ['id']});
    this.transactionRepository.delete(products.map(product => product.id));
    this.productRepository.update(transaction.idProduct, {status: Status.sold, idСustomer: transaction.idCustomer});
  }
}
