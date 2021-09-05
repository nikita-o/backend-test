import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from 'src/entities/product.entity';
import { ProductRest } from 'src/entities/productRest.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { AddProductRestDto } from './dto/AddProductRestDto.dto';
import { CreateProductDto } from './dto/createProductDto.dto';
import { GetProductInShopDto } from './dto/getProductInShop.dto';
import { UpdateProductDto } from './dto/updateProductDto.dto';
import { CheckGuard } from './guards/checkOwnerProduct.guard';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiCreatedResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Создание товара' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() shop: CreateProductDto): Promise<void> {
    await this.productService.create(shop, req.user);
  }

  @ApiCreatedResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Добавление товара в магазин' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post('addInShop')
  async addToStore(@Body() productRest: AddProductRestDto): Promise<void> {
    const { shopId, productId, count } = productRest;
    await this.productService.addToStore(shopId, productId, count);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение товаров постранично' })
  @Get('page/:index')
  async getPage(@Param('index') index: number): Promise<Product[]> {
    return await this.productService.getPage(index);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение товаров в магазине постранично' })
  @Get('shopProduct')
  async getPageByShop(
    @Query() queryParams: GetProductInShopDto,
  ): Promise<ProductRest[]> {
    const { shopId, page } = queryParams;
    return await this.productService.getPageByShop(shopId, page);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение товара по имени' })
  @Get('getByName/:name')
  async getByName(@Param('name') name: string): Promise<Product[]> {
    return await this.productService.getByName(name);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Обновление товара по id' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard, CheckGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() product: UpdateProductDto,
  ): Promise<void> {
    await this.productService.update(id, product);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Удаление товара по id' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard, CheckGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.productService.delete(id);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение товара по id' })
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Product> {
    return await this.productService.getById(id);
  }
}
