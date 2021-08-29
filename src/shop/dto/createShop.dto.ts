import { ApiProperty } from "@nestjs/swagger";

export class CreateShopDto {
    @ApiProperty({
        type: String,
        default: 'name',
    })
    name: string;
}