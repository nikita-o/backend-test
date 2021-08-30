import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { error } from 'console';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from 'src/product/dto/createProduct.dto';
import { TypeormExceptionFilter } from 'src/typeormException.filter';
import { CreateShopDto } from './dto/createShop.dto';
import { ShopDto } from './dto/shop.dto';
import { UpdateShopDto } from './dto/updateShop.dto';

import { ShopService } from './shop.service'

@ApiTags('shop')
@Controller('shop')
//@UseFilters(TypeormExceptionFilter)
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @ApiOperation({summary: 'Получить все магазины'})
  @ApiOkResponse({description: 'found all', type: [ShopDto]})
  @Get()
  getAll(): Promise<ShopDto[]> {
      return this.shopService.findAll();
  }

  @ApiOperation({summary: 'Получить магазин по id'})
  @ApiOkResponse({description: 'found one', type: ShopDto})
  @Get('get/:id')
  getById(@Param('id') id: number): Promise<ShopDto> {
      return this.shopService.FindById(id);
  }

  @ApiOperation({summary: 'Создать магазин'})
  @ApiCreatedResponse({description: 'create'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createShop(@Req() req: any, @Body() shop: CreateShopDto): void {
    this.shopService.create(req.user.userId, shop);
  }

  @ApiOperation({summary: 'Обновить магазин'})
  @ApiOkResponse({description: 'update'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id') 
  async update(@Param('id') id: number, @Body() shop: UpdateShopDto, @Req() req) {
    await this.shopService.checkOwner(id, req.user.userId)
    .then(()=>{
      this.shopService.update(id, shop);
    })
    .catch((err)=> {
      throw new HttpException({
        message: 'not owner.'
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @ApiOperation({summary: 'Удалить магазин'})
  @ApiOkResponse({description: 'delete'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')  
  async delete(@Param('id') id: number, @Req() req) {
    await this.shopService.checkOwner(id, req.user.userId)
    .then(()=>{
      this.shopService.deleteShop(id);
    })
    .catch((err)=> {
      throw new HttpException({
        message: 'not owner.'
      }, HttpStatus.BAD_REQUEST);
    });
  }
  
  @ApiOperation({summary: 'Получить продажи магазина'})
  @ApiOkResponse({description: 'getSold'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('solds/:id') // переместить в товары?
  async getSold(@Param('id') id: number, @Req() req) {
    try {
      await this.shopService.checkOwner(id, req.user.userId)
    } catch (error) {
      throw new HttpException({
        message: 'not owner.'
      }, HttpStatus.BAD_REQUEST);
    }

    return await this.shopService.getSold(id);
  }
  
  @ApiOperation({summary: 'Получить аналитику всех магазинов по текущему пользователю'})
  @ApiOkResponse({description: 'getAnalitics'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('analitic')    // переместить в юзеры?
  getAnalitics(@Req() req: any) {
    return this.shopService.analiticByUser(req.user.userId);
  }

  @ApiOperation({summary: 'Получить аналитику магазина'})
  @ApiOkResponse({description: 'getAnaliticByShopId'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('analitic/:id')
  async getAnaliticByShopId(@Param('id') id: number, @Req() req) {
    try {
      await this.shopService.checkOwner(id, req.user.userId)
    } catch (error) {
      throw new HttpException({
        message: 'not owner.'
      }, HttpStatus.BAD_REQUEST);
    }
    return await this.shopService.analiticByShopId(id);
  }
}
