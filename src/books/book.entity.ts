// book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Author } from '../authors/author.entity';

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
}

