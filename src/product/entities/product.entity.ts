import { ApiProperty } from '@nestjs/swagger';
import { Shop } from 'src/shop/entities/shop.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Status } from '../product.constants';
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cost: number;

    @Column()
    idShop: number;

    @Column()
    idOwner: number;

    @Column({default: Status.free})
    status: Status;

    @Column({nullable: true})
    idСustomer: number;

    @Column({nullable: true})
    image: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}