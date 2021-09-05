import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: String, default: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, default: 'description', required: false })
  @IsString()
  description: string;

  @ApiProperty({ type: Number, default: 100 })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
