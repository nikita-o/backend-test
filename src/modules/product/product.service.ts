import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProductDto.dto';
import { UpdateProductDto } from './dto/updateProductDto.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(productDto: CreateProductDto, owner: User): Promise<void> {
    const product: Product = this.productRepository.create({
      ...productDto,
      owner,
    });
    this.productRepository.save(product);
  }

  async getPage(page: number, count = 10): Promise<Product[]> {
    return await this.productRepository.find({
      skip: page * count,
      take: count,
      select: ['id', 'name'],
    });
  }

  // async getPageByUser(page: number, count = 10): Promise<Product[]> {
  //   return await this.productRepository.find({
  //     skip: page * count,
  //     take: count,
  //     select: ['id', 'name'],
  //   });
  // }

  // async getPageByShop(page: number, count = 10): Promise<Product[]> {
  //   return await this.productRepository.find({
  //     skip: page * count,
  //     take: count,
  //     select: ['id', 'name'],
  //   });
  // }

  async getById(id: number): Promise<Product> {
    return await this.productRepository.findOne(id, {
      select: ['id', 'name'],
    });
  }

  async getByName(name: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { name },
      select: ['id', 'name'],
    });
  }

  async update(id: number, userDto: UpdateProductDto): Promise<void> {
    // const user: User = this.productRepository.create({
    //   name: userDto.name,
    // });
    await this.productRepository.update(id, userDto);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
