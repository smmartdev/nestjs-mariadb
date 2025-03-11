import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../cart/cart.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,  // Inject the users repository
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,  // Inject the users repository

    ) { }

    // Method to find a user by ID
    async findUserById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id }
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async getCart(userId: number): Promise<Cart> {
        // Fetch the cart based on userId and load the books related to the cart
        const cart = await this.cartRepository.findOne({
            where: { userId: userId },
            // relations: ['books'],  // Ensure the books relation is loaded
        });

        // Check if the cart exists for the given userId
        if (!cart) {
            throw new NotFoundException(`Cart not found for userId: ${userId}`);
        }

        return cart;  // Return the cart with the related books
    }
}
