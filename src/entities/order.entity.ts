/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderContent } from './orderContent.entity';
import { Shop } from './shop.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Shop, { onDelete: 'NO ACTION' })
  shop: Shop;

  @ManyToOne(type => User)
  seller: User;

  @ManyToOne(type => User)
  buyer: User;

  @Column()
  totalSum: number;

  @Column({default: false})
  checked: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  // ---

  @OneToMany(type => OrderContent, orderContent => orderContent.order)
  ordersContent: OrderContent[]
}
