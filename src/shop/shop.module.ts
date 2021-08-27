import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shop } from './shop.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Shop])
    ],
    controllers: [
        ShopController, 
    ],
    providers: [
        ShopService, ],
})
export class ShopModule {}
