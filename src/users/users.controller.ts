import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from './user.entity'; // Assuming you use Role enum
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Cart } from 'src/carts/cart.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(JwtAuthGuard,RolesGuard)
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number, req: Request): Promise<User> {
    return this.usersService.findOne(id);
  }


  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)

  @Get(':id/cart')
  getUserCartWithBooks(@Param('id') id: number, req: Request): Promise<Cart> {
    return this.usersService.getUserCartWithBooks(id);
  }

}
