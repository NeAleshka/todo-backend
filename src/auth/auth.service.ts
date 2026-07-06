import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GoogleUser } from './auth.srategy';
import { JwtService } from '@nestjs/jwt';
import { ConfigEnvService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigEnvService,
  ) {}

  async validateOrCreateUser(user?: GoogleUser) {
    if (!user) throw new UnauthorizedException('User not found');

    let bdUser = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });

    if (!bdUser) {
      bdUser = await this.prismaService.user.create({
        data: {
          email: user.email ?? '',
          picture: user.picture,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    }
    return bdUser;
  }

  generateToken(user: { id: number; email: string }) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }
  authWithLogin(userData: { email: string; password: string }) {
    const { email, password } = userData;

    return this.prismaService.user.findUnique({
      where: { email, password },
    });
  }

  async singUp(userData: { email: string; password: string }) {
    const user = await this.prismaService.user.create({
      data: {
        email: userData.email,
        password: userData.password,
      },
    });
    console.log(user);

    return {
      accessToken: this.generateToken({ id: user.id, email: user.email })
        .access_token,
      user,
    };
  }
}
