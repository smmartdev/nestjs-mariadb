import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';

import { User } from './users/user.entity'; // Import the User entity
import { Book } from './books/book.entity';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/author.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',  // Database host
      port: 3306,         // MariaDB default port
      username: 'root',   // Your MariaDB username
      password: 'root', // Your MariaDB password
      database: 'nestjs',  // Name of your MariaDB database
      entities: [User,Book,Author],
      synchronize: true,  // Automatically create database schema
    }),
    UsersModule,  // Importing the Users module
    BooksModule,
    AuthorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
