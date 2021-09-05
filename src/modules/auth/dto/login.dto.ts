import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, default: 'name' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, default: 'secret' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
