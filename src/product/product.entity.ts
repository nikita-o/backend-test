import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    //

    @Column()
    name: string;

    @Column()
    idShop: number;

    @Column()
    status: number;

    @Column()
    idСustomer: number;

    @Column()
    image: number;

    //

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}