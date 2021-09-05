/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { Shop } from './shop.entity';
import { User } from './user.entity';

@Entity()
export class Basket {
  @PrimaryColumn({name: 'shopId'})
  @ManyToOne(type => Shop)
  shop: Shop | number;

  @PrimaryColumn({name: 'buyerId'})
  @ManyToOne(type => User)
  buyer: User | number;

  // FIXME: нужно для каждой корзины свой счетчик, а это общий получается, хоть и будет работать...
  @PrimaryGeneratedColumn()
  rowId: number;

  @ManyToOne(type => Product)
  product: Product | number;

  @Column()
  count: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
