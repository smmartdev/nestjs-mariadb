import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from './user.entity'; // Assuming you use Role enum
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Cart } from 'src/cart/cart.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOneUser(@Param('id') id: number, req: Request): Promise<User> {
    return this.usersService.findUserById(id);
  }


  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN,Role.USER)
  @Get(':id/cart')
  findOneCart(@Param('id') id: number): Promise<Cart> {
    return this.usersService.getCart(id);
  }
}
