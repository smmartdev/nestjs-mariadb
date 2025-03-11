// book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Author } from '../authors/author.entity';
import { Cart } from 'src/cart/cart.entity';

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
  @JoinColumn({ name: 'authorId' })  // This defines the foreign key column (authorId) on the books table
  author: Author;

  @ManyToOne(() => Cart, (cart) => cart.books)
  @JoinColumn({ name: 'id' })  // Join the cartId column to the Cart entity
  cart: Cart;
}




