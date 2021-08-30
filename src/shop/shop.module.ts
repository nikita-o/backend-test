import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shop } from './entities/shop.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Shop, Product])
    ],
    controllers: [
        ShopController, 
    ],
    providers: [
        ShopService, 
    ],
})
export class ShopModule {}
