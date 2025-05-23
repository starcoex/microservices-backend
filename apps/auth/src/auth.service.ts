import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { TokenPayload } from './interfaces/token-payload.interface';
import { User } from './users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private calculateExpirationDate(expirationKey: string): Date {
    const expirationDuration = this.configService.getOrThrow(expirationKey);
    const expirationDate = new Date();
    expirationDate.setTime(
      expirationDate.getTime() + expirationDuration * 1000,
    ); // 밀리초 단위로 변환
    return expirationDate;
  }

  generateTokens(
    tokenPayload: TokenPayload,
    rememberMe: boolean,
  ): {
    accessToken: string;
    accessExpirationDate: Date;
  } {
    const accessTokenKey = rememberMe
      ? 'AUTH_JWT_REMEMBER_ME_ACCESS_EXPIRATION'
      : 'AUTH_JWT_ACCESS_EXPIRATION';

    const accessExpirationDate = this.calculateExpirationDate(accessTokenKey);
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('AUTH_JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow(accessTokenKey)}s`,
    });
    return {
      accessToken,
      accessExpirationDate,
    };
  }

  private setHttpOnlyCookie(
    response: Response,
    tokenName: string,
    tokenValue: string,
    expirationDate: Date,
  ): void {
    response.cookie(tokenName, tokenValue, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expirationDate,
    });
  }

  private async verifyUser(
    email: string,
    password: string,
    rememberMe: boolean,
  ) {
    const user = await this.usersService.getUser({ email });
    await this.usersService.validateUserPassword(user, password);
    await this.usersService.updateUserRememberMe(user.id, rememberMe);
    return user;
  }

  private async generateAndSaveTokens(
    tokenPayload: TokenPayload,
    rememberMe: boolean,
  ): Promise<{
    accessToken: string;
    accessExpirationDate: Date;
  }> {
    return this.generateTokens(tokenPayload, rememberMe);
  }

  async login(user: User, res: Response, redirect = false) {
    if (!user.isActive) {
      throw new UnauthorizedException('이메일 인증이 안 되었습니다');
    }
    const tokenPayload: TokenPayload = { userId: user.id };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        this.configService.get('AUTH_JWT_ACCESS_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
    if (redirect) {
      res.redirect(this.configService.getOrThrow('AUTH_UI_REDIRECT'));
    }
    return token;
  }

  async logout(res: Response, id: number) {
    await this.prismaService.user.update({
      where: { id },
      data: { accessToken: null },
    });
    res.clearCookie('Authentication');
  }
}
