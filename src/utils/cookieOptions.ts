import { CookieOptions } from 'express';

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain:
    process.env.NODE_ENV === 'dev' ? 'localhost' : 'weightrecord.mederak.com',
  path: '/',
  sameSite: 'none',
  secure: true,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};
