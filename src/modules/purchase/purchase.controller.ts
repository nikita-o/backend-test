import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
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

import { Basket } from 'src/entities/basket.entity';
import { Order } from 'src/entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { PurchaseService } from './purchase.service';

@ApiTags('purchase')
@ApiBadRequestResponse({ description: 'Ошибка валидации данных' })
@ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @ApiOperation({
    summary: 'Добавление товара в корзину',
    description:
      'если один и тот же товар добавляется повторно, обновится его количество',
  })
  @ApiCreatedResponse({ description: 'Успешно' })
  @Post('addCart')
  async addCart(
    @Query('shopId', ParseIntPipe) shopId: number,
    @Query('productId', ParseIntPipe) productId: number,
    @Query('count', ParseIntPipe) count: number,
    @Req() req: any,
  ): Promise<void> {
    await this.purchaseService.addCart(shopId, req.user.id, productId, count);
  }

  @ApiOperation({ summary: 'Удаление товара из корзины' })
  @ApiCreatedResponse({ description: 'Успешно' })
  @Delete('deleteCart')
  async deleteCart(
    @Query('shopId', ParseIntPipe) shopId: number,
    @Query('rowId', ParseIntPipe) rowId: number,
    @Req() req: any,
  ): Promise<void> {
    await this.purchaseService.deleteCart(shopId, req.user.id, rowId);
  }

  @ApiOperation({ summary: 'Просмотр корзины' })
  @ApiOkResponse({ description: 'Успешно' })
  @Get('showCart')
  async showCart(
    @Query('shopId', ParseIntPipe) shopId: number,
    @Req() req: any,
  ): Promise<Basket[]> {
    return await this.purchaseService.showCart(shopId, req.user.id);
  }

  @ApiOperation({ summary: 'Подтверждение покупки (покупателем)' })
  @ApiCreatedResponse({ description: 'Успешно' })
  @Post('buyerProofPurchase')
  async buyerProofPurchase(
    @Query('shopId', ParseIntPipe) shopId: number,
    @Req() req: any,
  ): Promise<void> {
    await this.purchaseService.buyerProofPurchase(shopId, req.user.id);
  }

  @ApiOperation({ summary: 'Просмотр неподтвержденных покупок в магазине' })
  @ApiOkResponse({ description: 'Успешно' })
  @ApiConflictResponse({ description: 'Магазин не принадлежит пользователю' })
  @Get('showPurchaseShop')
  async showPurchaseShop(
    @Query('shopId', ParseIntPipe) shopId: number,
    @Req() req: any,
  ): Promise<Order[]> {
    await this.purchaseService.checkShop(req.user.id, shopId);
    return await this.purchaseService.showPurchaseShop(shopId);
  }

  @ApiOperation({ summary: 'Подтверждение покупки (продавцом)' })
  @ApiConflictResponse({ description: 'Документ не принадлежит пользователю' })
  @ApiCreatedResponse({ description: 'Успешно' })
  @Post('sellerProofPurchase')
  async sellerProofPurchase(
    @Query('orderId', ParseIntPipe) orderId: number,
    @Req() req: any,
  ): Promise<void> {
    await this.purchaseService.checkPurchase(req.user.id, orderId);
    await this.purchaseService.sellerProofPurchase(orderId);
  }

  @ApiOperation({ summary: 'Отклонение покупки (продавцом)' })
  @ApiCreatedResponse({ description: 'Успешно' })
  @ApiConflictResponse({ description: 'Документ не принадлежит пользователю' })
  @Delete('sellerProofPurchase')
  async sellerRejectionPurchase(
    @Query('orderId', ParseIntPipe) orderId: number,
    @Req() req: any,
  ): Promise<void> {
    await this.purchaseService.checkPurchase(req.user.id, orderId);
    await this.purchaseService.sellerRejectionPurchase(orderId);
  }

  @ApiOperation({ summary: 'Просмотр всех покупок в магазине' })
  @ApiOkResponse({ description: 'Успешно' })
  @ApiConflictResponse({ description: 'Магазин не принадлежит пользователю' })
  @Get('showAllPurchaseShop')
  async showAllPurchaseShop(
    @Query('shopId', ParseIntPipe) shopId: number,
    @Req() req: any,
  ): Promise<Order[]> {
    await this.purchaseService.checkShop(req.user.id, shopId);
    return await this.purchaseService.showAllPurchaseShop(shopId);
  }
}
