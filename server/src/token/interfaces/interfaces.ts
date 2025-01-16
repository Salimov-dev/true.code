import { Token } from '@prisma/client';

export interface ITokens {
  accessToken: string;
  refreshToken: Token;
}

export interface ICookieOptions {
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  secure: boolean;
  path: string;
  expires: Date;
}
