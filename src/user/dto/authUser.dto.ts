import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthUserDto {
    @ApiProperty({
        type: String,
        default: 'name',
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        type: String,
        default: 'secret',
    })
    @IsNotEmpty()
    password: string;
}