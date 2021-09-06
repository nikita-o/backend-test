import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop.entity';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Product])],
  providers: [ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
