/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from './shop.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Shop)
  shop: Shop;

  @ManyToOne(type => User)
  buyer: User;

  @Column()
  totalSum: number;

  @Column()
  checked: boolean;
}
