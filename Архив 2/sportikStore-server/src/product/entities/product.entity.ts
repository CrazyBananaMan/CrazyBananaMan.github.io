import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Basket } from '../../basket/entities/basket.entity';
import { Category} from 'src/category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  remainingQuantity: number;

  @Column({ nullable: false, default: 'no_image.jpg' }) // Добавим nullable для изображения
  image: string;

  @ManyToMany(() => Basket, (basket) => basket.products)
  @JoinTable()
  baskets: Basket[];

  @ManyToOne(() => Category, category => category.products)
  category: Category;
}