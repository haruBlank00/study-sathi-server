import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AUTH_MODEL } from './constants';
import { Auth } from './interfaces';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AUTH_MODEL) private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async refreshToken(token: string) {
    /**
     * Read refresh token from header
     * verify if it's valid
     * if it is, generate a new access / refresh token
     * else throw unauthenticated error
     */
    const result = await this.verifyToken(token);

    if (!result.success) {
      return {
        success: false,
      };
    }

    const decodedToken: { email: string; iat: Date; exp: Date } =
      await this.jwtService.decode(token);
    const tokens = await this.generateTokens(decodedToken.email);
    return {
      success: true,
      tokens,
    };
  }

  private async generateTokens(email: string) {
    const accessToken = await this.jwtService.signAsync(
      { email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      },
    );
    return { accessToken, refreshToken };
  }

  private async verifyToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return { success: true, message: 'Token verified.' };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
