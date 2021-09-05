import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: String, default: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, default: 'secret' })
  @IsString()
  password: string;
}
