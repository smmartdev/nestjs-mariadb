import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Book } from '../books/book.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  bookId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id' })
  user: User;

  @OneToMany(() => Book, (book) => book.cart)
  books: Book[];
}
