import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configs/configuration';

import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({load: [configuration]}),
    AuthModule, 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    ProductModule, 
    ShopModule, 
    UserModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
