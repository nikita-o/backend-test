import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { TransactionProduct } from './entities/transactionProduct.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, TransactionProduct])
    ],
    controllers: [
        ProductController, ],
    providers: [
        ProductService, ],
})
export class ProductModule {}
