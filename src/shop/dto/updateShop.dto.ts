import { PartialType } from "@nestjs/swagger";
import { CreateShopDto } from "./createShop.dto";

export class UpdateShopDto extends PartialType(CreateShopDto) {}