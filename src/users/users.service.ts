import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/carts/cart.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,  // Inject the users repository

    ) { }

 

      // Method to find a user by ID
  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
        where: { id }
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }


        // Find a user by ID
        async findOne(id: number): Promise<User> {
            const user = await this.usersRepository.findOne({
                where: { id } // Provide the ID inside a "where" object
            });
    
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
    
            user.password = '';
            return user;
        }
    

async getUserCartWithBooks(userId: number): Promise<Cart> {
    // Retrieve the cart of the user with associated cartBooks and book details
    
    const user = await this.usersRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.cart', 'cart') // Join cart
    .leftJoinAndSelect('cart.cartBooks', 'cartBooks') // Join cartBooks
    .leftJoinAndSelect('cartBooks.book', 'book') // Join books inside cartBooks
    .where('user.id = :userId', { userId })
    .getOne(); // You want to get the user with their cart, not just cart

  if (!user || !user.cart) {
      throw new NotFoundException(`Cart for user with ID ${userId} not found`);
  }
  return user.cart; // Return only the cart entity
}
}
