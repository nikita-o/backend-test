import { PartialType } from '@nestjs/swagger';
import { CreateShopDto } from 'src/modules/shop/dto/createShopDto.dto';

export class UpdateProductDto extends PartialType(CreateShopDto) {}
