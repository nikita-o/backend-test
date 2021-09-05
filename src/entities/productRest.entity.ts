/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Shop } from './shop.entity';

@Entity()
export class ProductRest {
  @ManyToOne(type => Shop, { primary: true })
  shop: number;

  @ManyToOne(type => Product, { primary: true })  // TODO: one to one?
  product: number;

  @Column()
  count: number;
}
