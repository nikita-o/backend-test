import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdatePasswordUserDto {
    @ApiProperty({
        type: String,
        default: 'OLD_secret',
    })
    @IsNotEmpty()
    oldPassword: string;

    @ApiProperty({
        type: String,
        default: 'NEW_secret',
    })
    @IsNotEmpty()
    newPassword: string;
}