import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.config';
import { ConfigEnvService } from './config/config.service';
import { JwtModule } from '@nestjs/jwt';
import { StaticController } from './static.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Global()
@Module({
  controllers: [AppController, StaticController],
  providers: [PrismaService, ConfigEnvService],
  exports: [PrismaService, ConfigEnvService],
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
      validate: validateEnv,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigEnvService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigEnvService],
    }),
  ],
})
export class AppModule {}
