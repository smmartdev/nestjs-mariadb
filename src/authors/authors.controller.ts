import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AuthorsService } from './authors.service'; // Change to AuthorsService
import { CreateAuthorDto } from './create-author.dto'; // Change to CreateAuthorDto
import { Author } from './author.entity'; // Change to Author entity

@Controller('authors') // Change the route to 'authors'
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {} // Change to AuthorsService

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> { // Change to CreateAuthorDto
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll(): Promise<Author[]> { // Change to Author
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Author> { // Change to Author
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateAuthorDto: CreateAuthorDto, // Change to CreateAuthorDto
  ): Promise<Author> { // Change to Author
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.authorsService.remove(id);
  }
}
