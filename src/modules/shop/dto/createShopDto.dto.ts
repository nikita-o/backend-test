import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShopDto {
  @ApiProperty({ type: String, default: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, default: 'description', required: false })
  @IsString()
  description: string;
}
