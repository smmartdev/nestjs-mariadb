import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { RefreshToken } from './refresh-token.entity';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PassportModule } from '@nestjs/passport'; // Import PassportModule

@Module({
  imports: [
    PassportModule,  // Ensure PassportModule is imported to use passport strategies
    TypeOrmModule.forFeature([RefreshToken, User]),  // Ensure the entities are included here
    UsersModule,  // Import UsersModule to access its providers (like UsersService)
    JwtModule.register({
      secret: 'accessToken',  // Use a secret key (this should be stored in environment variables for production)
      signOptions: { expiresIn: '15m' },  // Set token expiration time
    }),
  ],
  providers: [
    AuthService,  // Add AuthService here (this was missing in the original code)
    JwtAuthGuard,  // Add JwtAuthGuard to make it available for use in controllers
    JwtStrategy,   // Add JwtStrategy to register the JWT strategy
  ],
  controllers: [AuthController],  // Controllers that will handle HTTP requests
  // exports: [JwtAuthGuard],  // Export JwtAuthGuard so it can be used in other modules
})
export class AuthModule {}
