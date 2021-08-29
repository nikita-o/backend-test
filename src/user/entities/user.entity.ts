import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, unique: true})
    name: string;

    @Column({nullable: true})
    avatar: number;

    @Column({nullable: true})
    mail: string;

    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    hashPassword: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}