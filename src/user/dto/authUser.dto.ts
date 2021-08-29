import { ApiProperty } from "@nestjs/swagger";

export class AuthUserDto {
    @ApiProperty({
        type: String,
        default: 'name',
    })
    username: string;

    @ApiProperty({
        type: String,
        default: 'secret',
    })
    password: string;
}