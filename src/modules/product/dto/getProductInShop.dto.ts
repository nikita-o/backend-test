import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetProductInShopDto {
  @ApiProperty({ type: Number, default: 1 })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  shopId: number;

  @ApiProperty({ type: Number, default: 1 })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  page: number;
}
