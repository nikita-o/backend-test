import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TypeormExceptionFilter } from 'src/typeormException.filter';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';
import { ProductGuard } from './product.guard';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
//@UseFilters(TypeormExceptionFilter)   
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({summary: 'Получить все товары'})
  @ApiOkResponse({description: 'getAll', type: [Product]})
  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @ApiOperation({summary: 'Получить товар по id'})
  @ApiOkResponse({description: 'getById', type: Product})
  @Get('get/:id')
  getById(@Param('id') id: number) {
    return this.productService.FindById(id);
  }

  @ApiOperation({summary: 'Создать товар'})
  @ApiOkResponse({description: 'create'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() product: CreateProductDto) {
    try { 
      await this.productService.add(req.user.userId, product);
    } catch (error) {
      throw new HttpException({
        message: 'not owner.'
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({summary: 'Удалить товар'})
  @ApiOkResponse({description: 'delete'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req) {
    await this.productService.checkOwner(id, req.user.userId)
    .then(()=>{
      this.productService.deleteProduct(id);
    })
    .catch((err)=> {
      throw new HttpException({
        message: 'not owner.'
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @ApiOperation({summary: 'Обновить товар'})
  @ApiOkResponse({description: 'update'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id') 
  async update(@Param('id') id: number, @Body() shop: UpdateProductDto, @Req() req) {
    await this.productService.checkOwner(id, req.user.userId)
    .then(()=>{
      this.productService.update(id, shop);
    })
    .catch((err)=> {
      throw new HttpException({
        message: 'not owner.'
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @ApiOperation({summary: 'Купить товар'})
  @ApiOkResponse({description: 'getPurchase'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('purchase/:id')
  getPurchase(@Param('id') idProduct: number, @Req() req) {
    this.productService.purchaseProduct(req.user.userId, idProduct);
  }

  @ApiOperation({summary: 'Подтвердить покупку товара'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('proofPurchase/:id')
  async proofPurchase(@Param('id') idTransaction: number, @Req() req) {
    try {      
      await this.productService.proofPurchase(idTransaction, req.user.userId);
    } catch (error) {
      throw new HttpException({
        message: 'not owner.'
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({summary: 'Посмотреть корзину'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('basket')
  async getBasket(@Req() req) {  
    return await this.productService.findBasket(req.user.userId);
  }

  @ApiOperation({summary: 'Посмотреть товары на подтверждение покупки'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('confirmations')
  async findProofPurchase(@Req() req) {
    return await this.productService.findProofPurchase(req.user.userId);
  }

  @ApiOperation({summary: 'Посмотреть купленные товары'})
  @ApiOkResponse({description: 'getSold'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('purchasedes')
  async findPurchase(@Req() req) {
    return await this.productService.findPurchase(req.user.userId);
  }

  @ApiOperation({summary: 'Посмотреть проданные товары'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('solds')
  async getSold(@Req() req) {
    return await this.productService.findSold(req.user.userId);
  }

  @ApiOperation({summary: 'Товары на продажу у пользователя'})
  @ApiOkResponse({description: 'getSold'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('for_sale')
  async userProducts(@Req() req) {
    return await this.productService.userProducts(req.user.userId);
  }
}
