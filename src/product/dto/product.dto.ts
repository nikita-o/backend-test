import { ApiProperty } from "@nestjs/swagger";

export class ProductDto { 
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
        default: 100,
    })
    cost: number;

    @ApiProperty({
        type: Number
    })
    idShop: number;
}