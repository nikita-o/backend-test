
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'user', description:'name'})
    @Column({nullable: true, unique: true})
    name: string;

    @Column({nullable: true})
    avatar: number;

    @ApiProperty({example:'user@mail.ru', description:'mail'})
    @Column({nullable: true})
    mail: string;

    @ApiProperty({example:'8123456789', description:'phone'})
    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    hashPassword: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}