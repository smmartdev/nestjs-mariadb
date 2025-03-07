import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from './authors.service'; // Change to AuthorsService
import { AuthorsController } from './authors.controller'; // Change to AuthorsController
import { Author } from './author.entity'; // Change to Author entity

@Module({
  imports: [TypeOrmModule.forFeature([Author])], // Change to Author entity
  providers: [AuthorsService], // Change to AuthorsService
  controllers: [AuthorsController], // Change to AuthorsController
  exports: [TypeOrmModule],  // Export TypeOrmModule to allow other modules to access AuthorRepository

})
export class AuthorsModule {} // Change to AuthorsModule
