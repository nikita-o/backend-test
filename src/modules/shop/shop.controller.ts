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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Shop } from 'src/entities/shop.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreateShopDto } from './dto/createShopDto.dto';
import { UpdateShopDto } from './dto/updateShopDto.dto';
import { ShopService } from './shop.service';

@ApiTags('shop')
@ApiBadRequestResponse({ description: 'Ошибка валидации данных' })
@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @ApiCreatedResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Создание магазина' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() shop: CreateShopDto): Promise<void> {
    await this.shopService.create(shop, req.user);
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

  @ApiOperation({ summary: 'Обновление данных магазина' })
  @ApiOkResponse({ description: 'Успешно' })
  @ApiConflictResponse({ description: 'Магазин не принадлежит пользователю' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') shopId: number,
    @Body() shop: UpdateShopDto,
    @Req() req,
  ): Promise<void> {
    await this.shopService.checkShop(req.user.id, shopId);
    await this.shopService.update(shopId, shop);
  }

  @ApiOperation({ summary: 'Удаление магазина по id' })
  @ApiOkResponse({ description: 'Успешно' })
  @ApiConflictResponse({ description: 'Магазин не принадлежит пользователю' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') shopId: number, @Req() req): Promise<void> {
    await this.shopService.checkShop(req.user.id, shopId);
    await this.shopService.delete(shopId);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение магазина по id' })
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Shop> {
    return await this.shopService.getById(id);
  }
}
