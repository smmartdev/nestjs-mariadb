// auth.service.ts with database storage for refresh tokens
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './refresh-token.entity';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
    
  ) {}


async login(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException('user does not exist');
    }

       if (!await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }        
    const payload = { username: user.username, sub: user.id };

         
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m', secret: 'accessToken' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d', secret: 'refreshToken' });
    
    // Store the refresh token
    await this.refreshTokenRepository.save({
     userId: user.id,
      token: refresh_token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });
    
    return { access_token, refresh_token };
  }

  async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  };

  async refreshToken(refreshToken: string) {
    try {
      // Verify the token

      const payload = this.jwtService.verify(refreshToken);
      
        if(!payload){
            throw new UnauthorizedException('Invalid refresh token');
        }

      // Check if token exists in database
      const storedToken = await this.refreshTokenRepository.findOneBy({userId: payload.sub
        
      });
      
      if (!storedToken) {
        throw new UnauthorizedException('Refresh token not found');
      }
      


      // Issue a new access token
      return {
        access_token: this.jwtService.sign(
          { username: payload.username, sub: payload.sub },
          { expiresIn: '15m' }
        )
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}