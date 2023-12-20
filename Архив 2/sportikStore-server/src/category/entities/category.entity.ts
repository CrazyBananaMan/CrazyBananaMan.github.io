import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/product/entities/product.entity'; 

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column({ nullable: false, default: 'no_image.jpg' }) // Добавим nullable для изображения
  image: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}