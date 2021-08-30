import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        default: 'name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        default: 'secret',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: String,
        default: 'name@mail.com',
    })
    @IsOptional()
    @IsEmail()
    mail: string;

    @ApiProperty({
        type: String,
        default: '+78005553535',
    })
    @IsOptional()
    @IsPhoneNumber()
    phone: string;
}