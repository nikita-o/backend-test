import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, default: 'name' })
  @IsString()
  username: string;

  @ApiProperty({ type: String, default: 'secret' })
  @IsString()
  password: string;
}
