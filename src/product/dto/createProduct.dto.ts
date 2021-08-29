import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto { 
    @ApiProperty({
        type: String,
        default: 'name',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: Number,
        default: 100,
    })
    @IsNotEmpty()
    @IsNumber()
    cost: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    idShop: number;
}