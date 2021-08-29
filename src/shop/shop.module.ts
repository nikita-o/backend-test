import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shop } from './entities/shop.entity';
import { ShopGuard } from './shop.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Shop])
    ],
    controllers: [
        ShopController, 
    ],
    providers: [
        ShopService, 
    ],
})
export class ShopModule {}
