import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto { 
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