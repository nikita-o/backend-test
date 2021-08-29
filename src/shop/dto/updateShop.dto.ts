import { PartialType } from "@nestjs/swagger";
import { CreateShopDto } from "./createShop.dto";

export class UpdateUserDto extends PartialType(CreateShopDto) {}