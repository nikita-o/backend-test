import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordUserDto {
    @ApiProperty({
        type: String,
        default: 'OLD_secret',
    })
    oldPassword: string;

    @ApiProperty({
        type: String,
        default: 'NEW_secret',
    })
    newPassword: string;
}