import { Injectable } from '@nestjs/common';
import { GoogleUser } from './auth.strategy';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async validateOrCreateUser(googleUser: GoogleUser) {
    let user = await this.prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: googleUser.email ?? '',
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
          picture: googleUser.picture,
        },
      });
    }

    return user;
  }
  generateToken(user: { id: number; email: string }) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
