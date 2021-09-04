import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Shop } from './shop.entity';
import { User } from './user.entity';

@Entity()
export class Basket {
  @ManyToOne(type => Shop, { primary: true })
  shop: Shop;

  @ManyToOne(type => User, { primary: true })
  buyer: User;

  @PrimaryGeneratedColumn()
  rowId: number;

  @ManyToOne(type => Product)
  product: Product;

  @Column()
  count: number;
}