import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
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
}
