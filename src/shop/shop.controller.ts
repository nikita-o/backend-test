import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { error } from 'console';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from 'src/product/dto/createProduct.dto';
import { Product } from 'src/product/entities/product.entity';
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
  @ApiOkResponse({description: 'Получены все магазины', type: [ShopDto]})
  @Get()
  getAll(): Promise<ShopDto[]> {
      return this.shopService.findAll();
  }

  @ApiOperation({summary: 'Получить магазин по id'})
  @ApiOkResponse({description: 'Получен магазин по id', type: ShopDto})
  @Get('get/:id')
  getById(@Param('id') id: number): Promise<ShopDto> {
      return this.shopService.FindById(id);
  }

  @ApiOperation({summary: 'Создать магазин'})
  @ApiOkResponse({description: 'Создан магазин'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createShop(@Req() req: any, @Body() shop: CreateShopDto): void {
    this.shopService.create(req.user.userId, shop);
  }

  @ApiOperation({summary: 'Обновить магазин'})
  @ApiOkResponse({description: 'Данные магазина обновлены'})
  @ApiBadRequestResponse({description: 'Магазин не принадлежит пользователю'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id') 
  async update(@Param('id') id: number, @Body() shop: UpdateShopDto, @Req() req) {
    await this.shopService.checkOwner(id, req.user.userId)
    .then(()=>{
      this.shopService.update(id, shop);
    })
    .catch((err)=> {
      if (err === 'not owner.')  {
        throw new HttpException({
          message: 'not owner.'
        }, HttpStatus.BAD_REQUEST);
      }

      console.error(err);
      throw new HttpException({
        message: 'server error'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @ApiOperation({summary: 'Удалить магазин'})
  @ApiOkResponse({description: 'Магазин удален'})
  @ApiBadRequestResponse({description: 'Магазин не принадлежит пользователю'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')  
  async delete(@Param('id') id: number, @Req() req) {
    await this.shopService.checkOwner(id, req.user.userId)
    .then(()=>{
      this.shopService.deleteShop(id);
    })
    .catch((err)=> {
      if (err === 'not owner.')  {
        throw new HttpException({
          message: 'not owner.'
        }, HttpStatus.BAD_REQUEST);
      }
      
      console.error(err);
      throw new HttpException({
        message: 'server error'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
  
  @ApiOperation({summary: 'Получить продажи магазина'})
  @ApiOkResponse({description: 'Получены продажи', type: [Product]})
  @ApiBadRequestResponse({description: 'Магазин не принадлежит пользователю'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('solds/:id')
  async getSold(@Param('id') id: number, @Req() req) {
    try {
      await this.shopService.checkOwner(id, req.user.userId)
      return await this.shopService.getSold(id);
    } catch (err) { // FIXME: А здесь еще "лучше" try catch... фильтр исключений надо бы по человечески
      if (err === 'not owner.')  {
        throw new HttpException({
          message: 'not owner.'
        }, HttpStatus.BAD_REQUEST);
      }
      
      console.error(err);
      throw new HttpException({
        message: 'server error'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiOperation({summary: 'Получить аналитику всех магазинов по текущему пользователю'})
  @ApiOkResponse({description: 'Получена аналитика'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('analitic')
  getAnalitics(@Req() req: any) {
    return this.shopService.analiticByUser(req.user.userId);
  }

  @ApiOperation({summary: 'Получить аналитику магазина'})
  @ApiOkResponse({description: 'Получена аналитика'})
  @ApiBadRequestResponse({description: 'Магазин не принадлежит пользователю'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('analitic/:id')
  async getAnaliticByShopId(@Param('id') id: number, @Req() req) {
    try {
      await this.shopService.checkOwner(id, req.user.userId)
      return await this.shopService.analiticByShopId(id);
    } catch (err) {
      if (err === 'not owner.')  {
        throw new HttpException({
          message: 'not owner.'
        }, HttpStatus.BAD_REQUEST);
      }
      
      console.error(err);
      throw new HttpException({
        message: 'server error'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
