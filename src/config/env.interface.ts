import { IsString, IsNumber, IsIn, IsNotEmpty } from 'class-validator';

export class EnvConfig {
  // 1. Режим окружения
  @IsIn(['dev', 'prod', 'test'])
  NODE_ENV: 'dev' | 'prod' | 'test' = 'dev';

  // 2. Порт
  @IsNumber()
  PORT: number = 3000;

  // 3. База данных
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  // 4. JWT
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  // 5. Google OAuth
  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_SECRET: string;

  // 6. URLs
  @IsNotEmpty()
  FRONTEND_URL: string;

  @IsNotEmpty()
  BACKEND_URL: string;
}
