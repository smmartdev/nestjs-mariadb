import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.entity';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/author.entity';
import { RefreshToken } from './auth/refresh-token.entity';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Cart } from './carts/cart.entity';
import { CartBook } from './carts/cart-book.enitiy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',  // Database host
      port: 3306,         // MariaDB default port
      username: 'root',   // Your MariaDB username
      password: 'root', // Your MariaDB password
      database: 'nestjs',  // Name of your MariaDB database
      entities: [Book,Author,User,RefreshToken,Cart,CartBook],
      synchronize: true,  // Automatically create database schema
    }),
    BooksModule,
    AuthorsModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
