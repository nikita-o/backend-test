import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { StatistikService } from './statistik.service';

@ApiTags('statistics')
@ApiBadRequestResponse({ description: 'Ошибка валидации данных' })
@ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
@Controller('statistics')
export class StatistikController {
  constructor(private statistikService: StatistikService) {}

  @ApiOperation({ summary: 'Статистика по магазину' })
  @ApiOkResponse({ description: 'Успешно' })
  @ApiConflictResponse({ description: 'Магазин не принадлежит пользователю' })
  @Get('statisticsShop/:id')
  async statisticsShop(
    @Param('id', ParseIntPipe) shopId: number,
    @Query('from', ParseIntPipe) from: number,
    @Query('after', ParseIntPipe) after: number,
    @Req() req,
  ): Promise<any> {
    await this.statistikService.checkShop(req.user.id, shopId);
    return await this.statistikService.statisticsShop(shopId);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Статистика по продажам' })
  @Get('statisticsSalesUser/:id')
  async statisticsSalesUser(
    @Query('from', ParseIntPipe) from: number,
    @Query('after', ParseIntPipe) after: number,
    @Req() req,
  ): Promise<any> {
    return await this.statistikService.statisticsSalesUser(req.user.id);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Статистика по покупкам' })
  @Get('statisticsPurchaseUser/:id')
  async statisticsPurchaseUser(
    @Query('from', ParseIntPipe) from: number,
    @Query('after', ParseIntPipe) after: number,
    @Req() req,
  ): Promise<any> {
    return await this.statistikService.statisticsPurchaseUser(req.user.id);
  }

  @ApiOperation({ summary: 'Статистика по товару' })
  @ApiOkResponse({ description: 'Успешно' })
  @ApiConflictResponse({ description: 'Товар не принадлежит пользователю' })
  @Get('statisticsSalesProduct/:id')
  async statisticsSalesProduct(
    @Param('id') productId: number,
    @Query('from', ParseIntPipe) from: number,
    @Query('after', ParseIntPipe) after: number,
    @Req() req,
  ): Promise<any> {
    await this.statistikService.checkProduct(req.user.id, productId);
    return await this.statistikService.statisticsSalesProduct(productId);
  }
}
