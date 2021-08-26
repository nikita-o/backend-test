import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    //

    @Column()
    name: string;

    @Column()
    avatar: number;

    @Column()
    mail: string;

    @Column()
    phone: string;

    //

    @Column()
    hashPassword: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}