import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleUser } from './auth.strategy';

export interface GoogleRequest extends Request {
  user: GoogleUser;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: GoogleRequest, @Res() res: Response) {
    const googleUser = req.user;
    const user = await this.authService.validateOrCreateUser(googleUser);
    const token = this.authService.generateToken(user);
    console.log('✅ Токен сгенерирован:', token);
    //@ts-ignore
    return res.redirect(`http://localhost:5173?token=${token.access_token}`);
  }
}
