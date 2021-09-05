/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderContent {
  @ManyToOne(type => Order, { primary: true })
  order: Order;

  @PrimaryGeneratedColumn()
  rowId: number;

  @ManyToOne(type => Product)
  product: Product;

  @Column()
  count: number;

  @Column()
  price: number;

  @Column()
  sum: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
