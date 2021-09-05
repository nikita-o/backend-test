import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddProductRestDto {
  @ApiProperty({ type: Number, default: 1 })
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @ApiProperty({ type: Number, default: 1 })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ type: Number, default: 1 })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
