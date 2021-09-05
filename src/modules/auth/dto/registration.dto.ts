import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class RegistrationDto {
  @ApiProperty({ type: String, default: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, default: 'secret' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, default: 'name@mail.com', required: false })
  @IsEmail()
  mail: string;

  @ApiProperty({ type: String, default: '+78005553535', required: false })
  @IsPhoneNumber()
  phone: string;
}
