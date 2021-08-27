import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Product } from './product.entity';
import { ProductGuard } from './product.guard';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse({description: 'getAll', type: Product})
  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @ApiOkResponse({description: 'getById', type: [Product]})
  @Get('id')
  getById(@Param('id') id: number) {
    return this.productService.FindById(id);
  }

  @ApiOkResponse({description: 'create'})
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() shop) {
    this.productService.add(shop);
  }

  @ApiOkResponse({description: 'delete'})
  @UseGuards(JwtAuthGuard)
  @UseGuards(ProductGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    this.productService.remove(id);
  }

  @ApiOkResponse({description: 'update'})
  @UseGuards(JwtAuthGuard)
  @UseGuards(ProductGuard)
  @Put(':id') 
  update(@Param('id') id: number, @Body() shop) {
    this.productService.update(id, shop);
  }

  @ApiOkResponse({description: 'getPurchase'})
  @UseGuards(JwtAuthGuard)
  @Get('purchase')
  getPurchase() {

  }

  @ApiOkResponse({description: 'getBasket'})
  @UseGuards(JwtAuthGuard)
  @Get('basket')
  getBasket() {

  }

  @ApiOkResponse({description: 'getSold'})
  @UseGuards(JwtAuthGuard)
  @Get('sold')
  getSold() {
  }
}
