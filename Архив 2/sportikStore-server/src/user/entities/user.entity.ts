import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Basket } from 'src/basket/entities/basket.entity';

@Entity('users') // 'users' will be the table name in the database
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Basket, (basket) => basket.user)
  @JoinColumn()
  basket: Basket;
}