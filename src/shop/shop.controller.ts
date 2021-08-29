import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from 'src/product/dto/createProduct.dto';
import { CreateShopDto } from './dto/createShop.dto';
import { ShopDto } from './dto/shop.dto';
import { UpdateShopDto } from './dto/updateShop.dto';
import { Shop } from './entities/shop.entity';
import { ShopGuard } from './shop.guard';
import { ShopService } from './shop.service'

@ApiTags('shop')
@Controller('shop')
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
  @Get(':id')
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
  @UseGuards(ShopGuard)
  @Put(':id') 
  update(@Param('id') id: number, @Body() shop: UpdateShopDto): void {
    this.shopService.update(id, shop);
  }

  @ApiOperation({summary: 'Удалить магазин'})
  @ApiOkResponse({description: 'delete'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Delete(':id')  
  delete(@Param('id') id: number): void {
    this.shopService.deleteShop(id);
  }
  
  @ApiOperation({summary: 'Получить продажи магазина'})
  @ApiOkResponse({description: 'getSold'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Get('solds/:id') // переместить в товары?
  getSold(@Param('id') id: number) {
      return 'getSold';
  }
  
  @ApiOperation({summary: 'Получить аналитику всех магазинов по текущему пользователю'})
  @ApiOkResponse({description: 'getAnalitics'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('analitic')    // переместить в юзеры?
  getAnalitics(@Req() req: any) {
      return 'getAnalitics';
      //this.shopService.analiticByUser(req.user);
  }

  @ApiOperation({summary: 'Получить аналитику магазина'})
  @ApiOkResponse({description: 'getAnaliticByShopId'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Get('analitic/:id')
  getAnaliticByShopId(@Param('id') id: number) {
      return 'getAnaliticByShopId';
      //this.shopService.analiticByShopId(id);
  }
}
