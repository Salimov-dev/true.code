import { Token } from './../../node_modules/.prisma/client/index.d';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { v4 } from 'uuid';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { ITokens } from './interfaces/interfaces';
import { Response } from 'express';
import { getCookieOptions } from '@utils/cookie-options.util';

@Injectable()
export class TokenService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async refreshTokens(refreshToken: string): Promise<ITokens> {
    const token = await this.prismaService.token
      .delete({
        where: { token: refreshToken },
      })
      .catch(() => null);

    // Проверка, если токен не найден
    if (!token) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const today = dayjs();
    const expDate = dayjs(token.expires);
    const isExpired = expDate.isBefore(today);

    if (!token.expires || isExpired) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.userService.findById(token.userId);

    return this.generateTokens(user);
  }

  generateTokens = async (user: User): Promise<ITokens> => {
    const accessToken = this.jwtService.sign({
      userId: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    });

    const refreshToken: Token = await this.getRefreshToken(user.id);
    const tokens = { accessToken, refreshToken };

    return tokens;
  };

  private getRefreshToken = async (userId: string): Promise<Token> => {
    const currentDate = dayjs();

    const expirationUnit = this.configService.get('TOKEN_EXPIRATION_UNIT');
    const expirationValue = this.configService.get('TOKEN_EXPIRATION_VALUE');

    const expireDate = currentDate
      .add(expirationValue, expirationUnit)
      .toDate();

    return await this.prismaService.token.create({
      data: {
        token: v4(),
        expires: expireDate,
        userId,
      },
    });
  };

  setRefreshTokenToCookies(tokens: ITokens, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }

    const { token, expires } = tokens.refreshToken;
    const cookieExpDate = dayjs(expires).toDate();

    const refreshToken = this.configService.get('REFRESH_TOKEN');

    res.cookie(refreshToken, token, getCookieOptions(cookieExpDate));
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
