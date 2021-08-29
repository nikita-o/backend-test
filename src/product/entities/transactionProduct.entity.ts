import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransactionProduct { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idProduct: number;

    @Column()
    idCustomer: number;

    @Column()
    idOwner: number;
}