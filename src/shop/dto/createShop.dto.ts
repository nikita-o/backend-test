import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateShopDto {
    @ApiProperty({
        type: String,
        default: 'name',
    })
    @IsNotEmpty()
    name: string;
}