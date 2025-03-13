import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/cart.entity';


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User,Cart])], 
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}