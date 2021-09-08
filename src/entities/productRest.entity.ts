import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Shop } from './shop.entity';

@Entity()
export class ProductRest {
  @PrimaryColumn({ name: 'shopId' })
  @ManyToOne(type => Shop, { onDelete: 'CASCADE' })
  shop: Shop | number;

  @PrimaryColumn({ name: 'productId' })
  @ManyToOne(type => Product, { onDelete: 'CASCADE' })
  product: Product | number;

  @Column()
  count: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
