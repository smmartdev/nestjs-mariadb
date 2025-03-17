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
        @InjectRepository(Cart)      
        private cartRepository: Repository<Cart>,  // Inject the users repository

        
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
    

async getUserCart(id: number): Promise<Cart> {
    // Retrieve the cart of the user with associated cartBooks and book details
    // Fetch the user's cart with related cart items and books
    const cart = await this.cartRepository.findOne({
        where: { user: { id } },
        relations: ['cartItems', 'cartItems.book'], // Load cart items and associated books
      });
  
      if (!cart) {
        throw new Error('Cart not found for this user');
      }

      return cart;
}
}
