import { Controller, Get, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { Cookies } from '@decorators/cookies.decorator';
import { TokenService } from './token.service';
import { Public } from '@auth/guards/jwt-auth.guard';

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

@Public()
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('refresh-tokens')
  async refreshTokens(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const tokens = await this.tokenService.refreshTokens(refreshToken);

    if (!tokens) {
      throw new UnauthorizedException();
    }

    this.tokenService.setRefreshTokenToCookies(tokens, res);
  }
}
