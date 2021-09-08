import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { Order } from 'src/entities/order.entity';
import { StatisticsService } from './statistics.service';
import { StatistikController } from './statistics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Shop, User, Product])],
  controllers: [StatistikController],
  providers: [StatisticsService],
})
export class StatistikModule {}
