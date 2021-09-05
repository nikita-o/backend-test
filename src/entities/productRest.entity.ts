/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { Shop } from './shop.entity';

@Entity()
export class ProductRest {
  @ManyToOne(type => Shop, { primary: true })
  shop: number;

  @ManyToOne(type => Product, { primary: true })
  product: number;

  @Column()
  count: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
