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
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Product } from 'src/entities/product.entity';
import { ProductRest } from 'src/entities/productRest.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { AddProductRestDto } from './dto/addProductRestDto.dto';
import { CreateProductDto } from './dto/createProductDto.dto';
import { GetProductInShopDto } from './dto/getProductInShop.dto';
import { UpdateProductDto } from './dto/updateProductDto.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@ApiBadRequestResponse({ description: 'Ошибка валидации данных' })
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Создание товара' })
  @ApiCreatedResponse({ description: 'Успешно' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() shop: CreateProductDto): Promise<void> {
    await this.productService.create(shop, req.user);
  }

  @ApiOperation({ summary: 'Добавление товара в магазин' })
  @ApiCreatedResponse({ description: 'Успешно' })
  @ApiConflictResponse({
    description: 'Товар / магазин, не принадлежит пользователю',
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post('addInShop')
  async addToStore(
    @Body() productRest: AddProductRestDto,
    @Req() req,
  ): Promise<void> {
    const { shopId, productId, count } = productRest;
    await this.productService.checkShop(req.user.id, shopId);
    await this.productService.checkProduct(req.user.id, productId);
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

  @ApiOperation({ summary: 'Обновление товара по id' })
  @ApiOkResponse({ description: 'Успешно' })
  @ApiConflictResponse({ description: 'Товар не принадлежит пользователю' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') productId: number,
    @Body() product: UpdateProductDto,
    @Req() req,
  ): Promise<void> {
    await this.productService.checkProduct(req.user.id, productId);
    await this.productService.update(productId, product);
  }

  @ApiOperation({ summary: 'Удаление товара по id' })
  @ApiOkResponse({ description: 'Успешно' })
  @ApiConflictResponse({ description: 'Товар не принадлежит пользователю' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') productId: number, @Req() req): Promise<void> {
    await this.productService.checkProduct(req.user.id, productId);
    await this.productService.delete(productId);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение товара по id' })
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Product> {
    return await this.productService.getById(id);
  }
}
