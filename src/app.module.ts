import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configs/configuration';

import { StatistikModule } from './modules/statistik/statistics.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { ProductModule } from './modules/product/product.module';
import { ShopModule } from './modules/shop/shop.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

import { QueryExceptionsFilter } from './queryExceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    StatistikModule,
    PurchaseModule,
    ProductModule,
    ShopModule,
    UserModule,
    AuthModule,
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
