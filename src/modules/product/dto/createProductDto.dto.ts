import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: String, default: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, default: 100 })
  @IsNumber()
  price: number;
}
