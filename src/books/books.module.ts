import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { AuthorsModule } from 'src/authors/authors.module';


@Module({
  imports: [TypeOrmModule.forFeature([Book]),AuthorsModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
