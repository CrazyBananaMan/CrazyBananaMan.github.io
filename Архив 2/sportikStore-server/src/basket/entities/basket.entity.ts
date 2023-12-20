import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.basket)
  @JoinColumn()
  user: User;


  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}