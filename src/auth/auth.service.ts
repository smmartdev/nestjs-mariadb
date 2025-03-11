// auth.service.ts with database storage for refresh tokens
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './refresh-token.entity';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { log } from 'console';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(User)
    private usersRepository: Repository<User>

  ) { }


  // Signup method
  async signup(dto: SignupDto): Promise<any> {
    // Check if the user already exists by username
    const existingEmail = await this.usersRepository.findOneBy({ email: dto.email });
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingUserName = await this.usersRepository.findOneBy({ username: dto.username });
    if (existingUserName) {
      throw new ConflictException('Username already exists');
    }

    // Hash the password before storing it
    const hashedPassword = await this.generateHash(dto.password);

    // Create the new user
    const user = this.usersRepository.create({
      username: dto.username,
      password: hashedPassword,
      email: dto.email
    });

    // Save the new user to the database
    await this.usersRepository.save(user);

    // Create JWT tokens for the new user
    const payload = { username: user.username, sub: user.id };

    const access_token = this.jwtService.sign(payload, { expiresIn: '15m', secret: 'accessToken' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d', secret: 'refreshToken' });

    // Store the refresh token in the database
    await this.refreshTokenRepository.save({
      userId: user.id,
      token: refresh_token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return { access_token, refresh_token };
  }



  async login(dto: LoginDto): Promise<any> {
    console.log("login called in controller")

    // const user = await this.usersRepository.findOneBy({ email:dto.email });
    const user = await this.usersRepository.findOne({
      where: [
        { email: dto.email },
        { username: dto.username }
      ],
    });
    if (!user) {
      throw new UnauthorizedException('user does not exist');
    }

    if (!await bcrypt.compare(dto.password, user.password)) {
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

      if (!payload) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Check if token exists in database
      const storedToken = await this.refreshTokenRepository.findOneBy({
        userId: payload.sub

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