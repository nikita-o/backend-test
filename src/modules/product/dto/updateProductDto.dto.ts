import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateShopDto } from 'src/modules/shop/dto/createShopDto.dto';

export class UpdateProductDto {
  @ApiProperty({ type: String, default: 'name', required: false })
  @IsString()
  name: string;

  @ApiProperty({ type: String, default: 'description', required: false })
  @IsString()
  description: string;

  @ApiProperty({ type: Number, default: 100, required: false })
  @IsNumber()
  price: number;
}
