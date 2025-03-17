// book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { Author } from '../authors/author.entity';
import { Cart } from 'src/carts/cart.entity';
import { CartItem } from 'src/carts/cart-item.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publishedDate: string;

  // Many books can belong to one author
  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'authorId' }) 
  author: Author;


  @OneToMany(() => CartItem, (cartItem) => cartItem.book)
  cartItems: CartItem[];

}

