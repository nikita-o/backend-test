import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductGuard } from './product.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @Get('id')
  getById(@Param('id') id: number) {
    return this.productService.FindById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() shop) {
    this.productService.add(shop);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(ProductGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    this.productService.remove(id);
  }

    // убрать?
    @UseGuards(JwtAuthGuard)
    @UseGuards(ProductGuard)
    @Put(':id') 
    update(@Param('id') id: number, @Body() shop) {
      this.productService.update(id, shop);
    }

  @UseGuards(JwtAuthGuard)
  @Get('purchase')
  getPurchase() {

  }

  @UseGuards(JwtAuthGuard)
  @Get('basket')
  getBasket() {

  }

  @UseGuards(JwtAuthGuard)
  @Get('sold')
  getSold() {
  }
}
