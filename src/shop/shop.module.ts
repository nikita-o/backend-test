import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shop } from './shop.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Shop])],
    controllers: [],
    providers: [],
})
export class ShopModule {}
