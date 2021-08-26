import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Files {
    @PrimaryGeneratedColumn()
    id: number;

    //

    @Column()
    namePath: string;

    @Column()
    name: string;

    //

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}