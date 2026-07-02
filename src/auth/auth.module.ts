import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleAuthStrategy } from './auth.srategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthStrategy],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
})
export class AuthModule {}
