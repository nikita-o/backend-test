import { ApiProperty } from "@nestjs/swagger";

export class ShopDto {
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
        type: Number,
    })
    idOwnerUser: number;
}