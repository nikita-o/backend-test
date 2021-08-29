import { ApiProperty } from "@nestjs/swagger";

// Only show, not input form.
export class UserDto {
    @ApiProperty({
        type: Number,
    })
    id: number;

    @ApiProperty({
        type: String,
        default: 'name',
    })
    name: string;

    @ApiProperty({
        type: String,
        default: 'mail',
    })
    mail: string;

    @ApiProperty({
        type: String,
        default: 'phone',
    })
    phone: string;
}