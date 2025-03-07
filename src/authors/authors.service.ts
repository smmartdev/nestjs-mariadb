import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity'; // Change to Author entity
import { CreateAuthorDto } from './create-author.dto'; // Change to CreateAuthorDto
import { NotFoundException } from '@nestjs/common'; // for throwing HTTP exceptions

@Injectable()
export class AuthorsService { // Change to AuthorsService
    constructor(
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>, // Change to Author repository
    ) { }

    // Create Author
    create(createAuthorDto: CreateAuthorDto): Promise<Author> { // Change to CreateAuthorDto
        const author = this.authorsRepository.create(createAuthorDto); // Change to Author repository
        return this.authorsRepository.save(author); // Change to Author repository
    }

    // Find all authors
    findAll(): Promise<Author[]> { // Change to Author
        return this.authorsRepository.find(); // Change to Author repository
    }

    // Find an author by ID
    async findOne(id: number): Promise<Author> { // Change to Author
        const author = await this.authorsRepository.findOne({
          where: { id },  // Provide the ID inside a "where" object
        });
      
        if (!author) { // Change to author
          throw new NotFoundException(`Author with ID ${id} not found`); // Change message to "Author"
        }
      
        return author; // Change to author
    }

    // Update an author by ID
    async update(id: number, updateAuthorDto: CreateAuthorDto): Promise<Author> { // Change to CreateAuthorDto
        const author = await this.findOne(id); // Change to author
        author.firstName = updateAuthorDto.firstName; // Change to appropriate fields for author
        author.lastName = updateAuthorDto.lastName; // Change to appropriate fields for author
        author.email = updateAuthorDto.email; // Change to appropriate fields for author
        return this.authorsRepository.save(author); // Change to Author repository
    }

    // Delete an author by ID
    async remove(id: number): Promise<void> {
        await this.authorsRepository.delete(id); // Change to Author repository
    }
}
