import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Shop } from './shop.entity';
import { ShopGuard } from './shop.guard';
import { ShopService } from './shop.service'

@ApiTags('shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @ApiOkResponse({description: 'found all', type: [Shop]})
  @Get()
  getAll() {
      return this.shopService.findAll();
  }

  @ApiOkResponse({description: 'found one', type: Shop})
  @Get(':id')
  getById(@Param('id') id: number) {
      return this.shopService.FindById(id);
  }

  @ApiCreatedResponse({description: 'create'})
  @UseGuards(JwtAuthGuard)
  @Post()
  createShop(@Req() req) {
      this.shopService.create(req.user, req.body);
  }

  @ApiOkResponse({description: 'update'})
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Put(':id') 
  update(@Param('id') id: number, @Body() shop) {
    this.shopService.update(id, shop);
  }

  @ApiOkResponse({description: 'delete'})
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Delete(':id')  
  delete(@Param('id') id: number) {
    this.shopService.remove(id);
  }
  
  @ApiOkResponse({description: 'getSold'})
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Get('solds/:id') // переместить в товары?
  getSold(@Param('id') id: number) {
      return 'getSold';
  }
  
  @ApiOkResponse({description: 'getAnalitics'})
  @UseGuards(JwtAuthGuard)
  @Get('analitic')    // переместить в юзеры?
  getAnalitics(@Req() req) {
      return 'getAnalitics';
      //this.shopService.analiticByUser(req.user);
  }

  @ApiOkResponse({description: 'getAnaliticByShopId'})
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Get('analitic/:id')
  getAnaliticByShopId(@Param('id') id: number) {
      return 'getAnaliticByShopId';
      //this.shopService.analiticByShopId(id);
  }
}
