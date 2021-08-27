import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ShopGuard } from './shop.guard';
import { ShopService } from './shop.service'

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  getAll() {
      return this.shopService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
      return this.shopService.FindById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createShop(@Req() req) {
      this.shopService.create(req.user, req.body);
  }

  // убрать?
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Put(':id') 
  update(@Param('id') id: number, @Body() shop) {
    this.shopService.update(id, shop);
  }

  // убрать?
  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Delete(':id')  
  delete(@Param('id') id: number) {
    this.shopService.remove(id);
  }
  

  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Get('solds/:id') // переместить в товары?
  getSold(@Param('id') id: number) {
      return 'getSold';
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('analitic')    // переместить в юзеры?
  getAnalitics(@Req() req) {
      return 'getAnalitics';
      //this.shopService.analiticByUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(ShopGuard)
  @Get('analitic/:id')
  getAnaliticByShopId(@Param('id') id: number) {
      return 'getAnaliticByShopId';
      //this.shopService.analiticByShopId(id);
  }
}
