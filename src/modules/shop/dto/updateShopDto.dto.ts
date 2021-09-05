import { PartialType } from '@nestjs/swagger';
import { CreateShopDto } from './createShopDto.dto';

export class UpdateShopDto extends PartialType(CreateShopDto) {}
