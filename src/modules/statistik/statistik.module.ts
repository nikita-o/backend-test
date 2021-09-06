import { StatistikService } from './statistik.service';
import { StatistikController } from './statistik.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, User, Product])],
  controllers: [StatistikController],
  providers: [StatistikService],
})
export class StatistikModule {}
