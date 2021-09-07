/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderContent {
  @PrimaryColumn({name: 'orderId'})
  @ManyToOne(type => Order, { onDelete: 'CASCADE' })
  order: Order | number;

  @PrimaryGeneratedColumn()
  rowId: number;

  @ManyToOne(type => Product, { onDelete: 'NO ACTION' })
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
