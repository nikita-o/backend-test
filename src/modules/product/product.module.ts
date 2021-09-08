import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from 'src/entities/product.entity';
import { ProductRest } from 'src/entities/productRest.entity';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductRest, Shop, User])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
