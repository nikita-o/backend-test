import { StatistikModule } from './modules/statistik/statistik.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configs/configuration';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ShopModule } from './modules/shop/shop.module';
import { ProductModule } from './modules/product/product.module';
import { APP_FILTER } from '@nestjs/core';
import { QueryExceptionsFilter } from './queryExceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ShopModule,
    ProductModule,
    PurchaseModule,
    StatistikModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionsFilter,
    },
  ],
})
export class AppModule {}
