import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Shop {
    @PrimaryGeneratedColumn()
    id: number;

    //

    @Column()
    name: string;
    
    @Column()
    idOwnerUser: number;

    @Column()
    coverShop: number;

    //

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}