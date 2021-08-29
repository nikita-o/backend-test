import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        default: 'name',
    })
    name: string;

    @ApiProperty({
        type: String,
        default: 'secret',
    })
    password: string;

    @ApiProperty({
        type: String,
        default: 'name@mail.com',
    })
    mail: string;

    @ApiProperty({
        type: String,
        default: '8-999-777-77-88',
    })
    phone: string;
}