import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Basket } from 'src/entities/basket.entity';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { Order } from 'src/entities/order.entity';
import { OrderContent } from 'src/entities/orderContent.entity';
import { ProductRest } from 'src/entities/productRest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Basket,
      Shop,
      User,
      Product,
      Order,
      OrderContent,
      ProductRest,
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
