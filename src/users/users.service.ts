import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
                where: { id },  // Provide the ID inside a "where" object
            });
    
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
    
            user.password = '';
            return user;
        }
    

        
    
}
