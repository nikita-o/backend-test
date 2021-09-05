import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateShopDto {
  @ApiProperty({ type: String, default: 'name' })
  @IsString()
  name: string;
}
