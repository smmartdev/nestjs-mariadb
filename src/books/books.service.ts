import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './create-book.dto';
import { NotFoundException } from '@nestjs/common'; // for throwing HTTP exceptions
import { UpdateBookDto } from './update-book.dto';
import { Author } from 'src/authors/author.entity';


@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
        @InjectRepository(Author) 
        private authorsRepository: Repository<Author> 
    ) { }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const { authorId, ...bookData } = createBookDto;

        // Fetch the Author by authorId
        const author = await this.authorsRepository.findOne( {where: { id: authorId },} );
        if (!author) {
            throw new NotFoundException(`Author with ID ${authorId} not found`);
        }

        // Create the Book with the Author association
        const book = this.booksRepository.create({
            ...bookData,  // Spread the other fields from CreateBookDto
            author,       // Set the Author object, not just the ID
        });

        return this.booksRepository.save(book); // Save the Book to the database
    }



    // Find all users
    findAll(): Promise<Book[]> {
        return this.booksRepository.find();
    }

    // Find a user by ID
    async findOne(id: number): Promise<Book> {
        const user = await this.booksRepository.findOne({
            where: { id },  // Provide the ID inside a "where" object
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }


    
      // Update Book
      async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
        // Fetch the Book with the Author relation (Eager load the author relation)
        const book = await this.booksRepository.findOne({
          where: { id },
          relations: ['author'],  // Ensure we load the author relation
        });
    
        if (!book) {
          throw new NotFoundException(`Book with ID ${id} not found`);
        }
    
        // If there's an authorId in the DTO, we fetch the Author entity
        if (updateBookDto.authorId) {
          // Use findOne with a `where` option for correct compatibility
          const author = await this.authorsRepository.findOne({
            where: { id: updateBookDto.authorId },  // Correcting how we query with `where`
          });
    
          if (!author) {
            throw new NotFoundException(`Author with ID ${updateBookDto.authorId} not found`);
          }
          book.author = author; // Assign the fetched Author entity to the book
        }
    
        // Update other fields if provided in the DTO
        if (updateBookDto.title) book.title = updateBookDto.title;
        if (updateBookDto.publishedDate) book.publishedDate = updateBookDto.publishedDate;
    
        // Save the updated Book to the database
        return this.booksRepository.save(book);
      }
    
    


    // Delete a user by ID
    async remove(id: number): Promise<void> {
        await this.booksRepository.delete(id);
    }
}
