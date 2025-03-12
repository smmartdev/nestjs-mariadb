// book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';
import { Book } from 'src/books/book.entity';
import { CartBook } from './cart-book.enitiy';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @OneToOne(() => User, user => user.cart)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartBook, (cartBook) => cartBook.cart, { cascade: true })
  cartBooks: CartBook[];
}

