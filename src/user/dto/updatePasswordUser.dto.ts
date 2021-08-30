import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePasswordUserDto {
    @ApiProperty({
        type: String,
        default: 'OLD_secret',
    })
    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @ApiProperty({
        type: String,
        default: 'NEW_secret',
    })
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}