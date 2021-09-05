import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Shop } from 'src/entities/shop.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreateShopDto } from './dto/createShopDto.dto';
import { UpdateShopDto } from './dto/updateShopDto.dto';
import { CheckGuard } from './guards/checkOwner.guard';
import { ShopService } from './shop.service';

@ApiTags('shop')
@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @ApiCreatedResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Создание магазина' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() shop: CreateShopDto): Promise<void> {
    this.shopService.create(shop, req.user);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение магазинов постранично' })
  @Get('page/:index')
  async getPage(@Param('index') index: number): Promise<Shop[]> {
    return await this.shopService.getPage(index);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение магазинов по имени' })
  @Get('getByName/:name')
  async getByName(@Param('name') name: string): Promise<Shop[]> {
    return await this.shopService.getByName(name);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Обновление данных магазина' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard, CheckGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() shop: UpdateShopDto,
  ): Promise<void> {
    await this.shopService.update(id, shop);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Удаление магазина по id' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard, CheckGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.shopService.delete(id);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение магазина по id' })
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Shop> {
    return await this.shopService.getById(id);
  }
}
