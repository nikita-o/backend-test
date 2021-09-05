import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: String, default: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
