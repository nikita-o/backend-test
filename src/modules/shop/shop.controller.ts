import { Controller } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller()
export class ShopController {
  constructor(private shopService: ShopService) {}
}
