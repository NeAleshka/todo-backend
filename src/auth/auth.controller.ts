import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { type Request, type Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuthStart() {
    console.log('start GoogleAuth');
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const googleUser = req.user;
    const user = await this.authService.validateOrCreateUser(googleUser);
    const token = this.authService.generateToken(user);
    res.cookie('accessToken', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.redirect('http://localhost:5173');
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Get('/me')
  async getMe(@Req() req: Request, @Res() res: Response) {
    const token = (req.cookies?.['accessToken'] as string) ?? '';
    if (!token) {
      return res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return res.sendStatus(HttpStatus.OK);
    } catch {
      return res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('/signIn')
  async singIn(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const authUser = await this.authService.authWithLogin({
      email: body.email,
      password: body.password,
    });
    if (!authUser) {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    } else res.sendStatus(HttpStatus.OK);
  }

  @Post('/signUp')
  async signUp(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    console.log(body);
    const { email, password } = body;
    const { accessToken, user } = await this.authService.singUp({
      email,
      password,
    });
    return res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
      .sendStatus(HttpStatus.OK)
      .send({ user });
  }
}
