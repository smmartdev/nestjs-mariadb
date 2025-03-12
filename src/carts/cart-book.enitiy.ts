// cart-book.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Cart } from 'src/carts/cart.entity';
import { Book } from 'src/books/book.entity';

@Entity('cart_books')
export class CartBook {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.cartBooks)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Book, (book) => book.cartBooks)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({ type: 'int', default: 1 })
  quantity: number;
}
