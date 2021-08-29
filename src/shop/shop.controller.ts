import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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

  @ApiOkResponse({description: 'found all', type: [ShopDto]})
  @Get()
  getAll() {
      return this.shopService.findAll();
  }

  @ApiOkResponse({description: 'found one', type: ShopDto})
  @Get(':id')
  getById(@Param('id') id: number) {
      return this.shopService.FindById(id);
  }

  @ApiCreatedResponse({description: 'create'})
  @ApiCookieAuth()
  @ApiBody({type: CreateShopDto})
  @UseGuards(JwtAuthGuard)
  @Post()
  createShop(@Req() req) {
    this.shopService.create(req.user.userId, req.body);
  }

  @ApiOkResponse({description: 'update'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Put(':id') 
  update(@Param('id') id: number, @Body() shop: UpdateShopDto, @Req() req) {
    //console.log(req.user);
    
    this.shopService.update(id, shop);
  }

  @ApiOkResponse({description: 'delete'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Delete(':id')  
  delete(@Param('id') id: number) {
    this.shopService.deleteShop(id);
  }
  
  @ApiOkResponse({description: 'getSold'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Get('solds/:id') // переместить в товары?
  getSold(@Param('id') id: number) {
      return 'getSold';
  }
  
  @ApiOkResponse({description: 'getAnalitics'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('analitic')    // переместить в юзеры?
  getAnalitics(@Req() req) {
      return 'getAnalitics';
      //this.shopService.analiticByUser(req.user);
  }

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
