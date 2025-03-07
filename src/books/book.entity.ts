import { Author } from 'src/authors/author.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publishedDate:Date;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'authorId' })  // Ensure that the foreign key is 'authorId'
  author: Author;

  @Column()
  authorId: number; // Foreign key to Author's id
}
