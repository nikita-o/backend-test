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
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { StatistikService } from './statistik.service';

@ApiTags('statistics')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
@Controller('statistics')
export class StatistikController {
  constructor(private statistikService: StatistikService) {}

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Статистика по магазину' })
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

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Статистика по товару' })
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
