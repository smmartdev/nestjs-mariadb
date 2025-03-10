import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service'; // Assuming you have a UsersService to find users
import { JwtPayload } from './interfaces/jwt-payload.interface'; // The interface for the JWT payload

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'accessToken', // Replace with an environment variable in production
    });
  }

  async validate(payload: JwtPayload) {
    console.log("inside validate in jwt.strategy.ts");
    const user = await this.usersService.findById(payload.sub); // Get user by ID (assumes JWT payload has 'sub' as user ID)
    if (!user) {
      throw new Error('User not found');
    }
    return user; // This will attach the user to request.user
  }
}
