import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { TransactionProduct } from './entities/transactionProduct.entity';
import { Shop } from 'src/shop/entities/shop.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, TransactionProduct, Shop])
    ],
    controllers: [
        ProductController, ],
    providers: [
        ProductService, ],
})
export class ProductModule {}
