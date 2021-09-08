import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Shop } from './shop.entity';
import { User } from './user.entity';

@Entity()
export class Basket {
  @PrimaryColumn({ name: 'shopId' })
  @ManyToOne(type => Shop, { onDelete: 'CASCADE' })
  shop: Shop | number;

  @PrimaryColumn({ name: 'buyerId' })
  @ManyToOne(type => User)
  buyer: User | number;

  @PrimaryGeneratedColumn()
  rowId: number;

  @ManyToOne(type => Product, { onDelete: 'CASCADE' })
  product: Product | number;

  @Column()
  count: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
