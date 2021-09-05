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
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from 'src/entities/product.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreateProductDto } from './dto/createProductDto.dto';
import { UpdateProductDto } from './dto/updateProductDto.dto';
import { CheckGuard } from './guards/checkOwner.guard';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiCreatedResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Создание магазина' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() shop: CreateProductDto): Promise<void> {
    this.productService.create(shop, req.user);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение магазина постранично' })
  @Get('page/:index')
  async getPage(@Param('index') index: number): Promise<Product[]> {
    return await this.productService.getPage(index);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение магазинов по имени' })
  @Get('getByName/:name')
  async getByName(@Param('name') name: string): Promise<Product[]> {
    return await this.productService.getByName(name);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Обновление магазина по id' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard, CheckGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() product: UpdateProductDto,
  ): Promise<void> {
    await this.productService.update(id, product);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Удаление магазина по id' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard, CheckGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.productService.delete(id);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение магазина по id' })
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Product> {
    return await this.productService.getById(id);
  }
}
