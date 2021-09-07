import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductRest } from 'src/entities/productRest.entity';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AddProductRestDto } from './dto/addProductRestDto.dto';
import { CreateProductDto } from './dto/createProductDto.dto';
import { UpdateProductDto } from './dto/updateProductDto.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(ProductRest)
    private productRestRepository: Repository<ProductRest>,
  ) {}

  async checkProduct(userId: number, productId: number) {
    await this.productRepository
      .findOneOrFail(productId, { where: { owner: userId } })
      .catch(e => {
        throw new HttpException('no owner product', HttpStatus.CONFLICT);
      });
  }

  async checkShop(userId: number, shopId: number) {
    await this.shopRepository
      .findOneOrFail(shopId, { where: { owner: userId } })
      .catch(e => {
        throw new HttpException('no owner shop', HttpStatus.CONFLICT);
      });
  }

  async create(productDto: CreateProductDto, owner: User): Promise<void> {
    const product: Product = this.productRepository.create({
      ...productDto,
      owner,
    });
    this.productRepository.save(product);
  }

  async addToStore(
    shopId: number,
    productId: number,
    count: number,
  ): Promise<void> {
    const store = await this.productRestRepository.findOne({
      shop: shopId,
      product: productId,
    });
    if (store) {
      await this.productRestRepository.update(
        { shop: shopId, product: productId },
        { count },
      );
      return;
    }
    await this.productRestRepository.save({
      shop: shopId,
      product: productId,
      count,
    });
  }

  async getPage(page: number, count = 10): Promise<Product[]> {
    return await this.productRepository.find({
      skip: page * count,
      take: count,
    });
  }

  async getPageByShop(
    shopId: number,
    page: number,
    count = 10,
  ): Promise<ProductRest[]> {
    return await this.productRestRepository.find({
      where: { shop: shopId },
      skip: page * count,
      take: count,
      relations: ['product'],
    });
  }

  async getById(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async getByName(name: string): Promise<Product[]> {
    return await this.productRepository.find({ where: { name } });
  }

  async update(id: number, userDto: UpdateProductDto): Promise<void> {
    await this.productRepository.update(id, userDto);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
