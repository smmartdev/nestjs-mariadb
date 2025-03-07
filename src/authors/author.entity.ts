import { Book } from '../books/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  // One Author can have many Books
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
