import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './entities/product.entity';
import { ProductGuard } from './product.guard';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @ApiOkResponse({description: 'getAll', type: Product})
  // @Get()
  // getAll() {
  //   return this.productService.findAll();
  // }

  // @ApiOkResponse({description: 'getById', type: [Product]})
  // @Get('id')
  // getById(@Param('id') id: number) {
  //   return this.productService.FindById(id);
  // }

  @ApiOkResponse({description: 'create'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() product: CreateProductDto) {
    this.productService.add(req.user.userId, product);
  }

  // @ApiOkResponse({description: 'delete'})
  // @ApiCookieAuth()
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(ProductGuard)
  // @Delete(':id')
  // delete(@Param('id') id: number) {
  //   this.productService.remove(id);
  // }

  // @ApiOkResponse({description: 'update'})
  // @ApiCookieAuth()
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(ProductGuard)
  // @Put(':id') 
  // update(@Param('id') id: number, @Body() shop) {
  //   this.productService.update(id, shop);
  // }

  @ApiOkResponse({description: 'getPurchase'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('purchase')
  getPurchase() {

  }

  @ApiOkResponse({description: 'getBasket'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('basket')
  getBasket() {

  }

  @ApiOkResponse({description: 'getSold'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('sold')
  getSold() {
  }
}
