import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';
import { ProductGuard } from './product.guard';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({summary: 'Получить все товары'})
  @ApiOkResponse({description: 'getAll', type: Product})
  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @ApiOperation({summary: 'Получить товар по id'})
  @ApiOkResponse({description: 'getById', type: [Product]})
  @Get('id')
  getById(@Param('id') id: number) {
    return this.productService.FindById(id);
  }

  @ApiOperation({summary: 'Создать товар'})
  @ApiOkResponse({description: 'create'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() product: CreateProductDto) {
    this.productService.add(req.user.userId, product);
  }

  @ApiOperation({summary: 'Удалить товар'})
  @ApiOkResponse({description: 'delete'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ProductGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    this.productService.deleteProduct(id);
  }

  @ApiOperation({summary: 'Обновить товар'})
  @ApiOkResponse({description: 'update'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ProductGuard)
  @Put(':id') 
  update(@Param('id') id: number, @Body() shop: UpdateProductDto) {
    this.productService.update(id, shop);
  }

  @ApiOperation({summary: 'Купить товар'})
  @ApiOkResponse({description: 'getPurchase'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('purchase')
  getPurchase() {

  }

  @ApiOperation({summary: 'Посмотреть корзину'})
  @ApiOkResponse({description: 'getBasket'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('basket')
  getBasket() {

  }

  @ApiOperation({summary: 'Посмотреть проданные товары'})
  @ApiOkResponse({description: 'getSold'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('sold')
  getSold() {
  }
}
