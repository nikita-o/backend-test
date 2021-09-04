import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from 'src/entities/basket.entity';
import { Order } from 'src/entities/order.entity';
import { OrderContent } from 'src/entities/orders_content.entity';
import { Product } from 'src/entities/product.entity';
import { ProductRest } from 'src/entities/productRest.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductRest,
      Basket,
      Order,
      OrderContent,
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
