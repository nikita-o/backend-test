import { Product } from './product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Basket } from './basket.entity';
import { Shop } from './shop.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  name: string;

  @Column({ nullable: true })
  hashPassword: string;
}
