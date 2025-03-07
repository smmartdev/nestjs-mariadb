import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { NotFoundException } from '@nestjs/common'; // for throwing HTTP exceptions


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    // Create User
    create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    // Find all users
    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    // Find a user by ID
    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({
          where: { id },  // Provide the ID inside a "where" object
        });
      
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
      
        return user;
      }


    // Update a user by ID
    async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
        const user = await this.findOne(id);
        user.name = updateUserDto.name;
        user.email = updateUserDto.email;
        return this.usersRepository.save(user);
    }

    // Delete a user by ID
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
