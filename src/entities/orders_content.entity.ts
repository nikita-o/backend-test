import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}
