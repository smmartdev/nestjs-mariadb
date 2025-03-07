import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book.dto';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.booksService.remove(id);
  }
}
