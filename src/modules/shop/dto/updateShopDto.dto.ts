import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateShopDto {
  @ApiProperty({ type: String, default: 'name', required: false })
  @IsString()
  name: string;

  @ApiProperty({ type: String, default: 'description', required: false })
  @IsString()
  description: string;
}
