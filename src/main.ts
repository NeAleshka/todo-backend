import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigEnvService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigEnvService);
  const frontUrl = configService.get('FRONTEND_URL');
  const backendUrl = configService.get('BACKEND_URL');
  const port = configService.get('PORT');
  // Включаем CORS для фронта
  console.log({ frontUrl });
  app.enableCors({
    origin: frontUrl, // разрешаем запросы только с нашего фронта
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Todo example')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .addTag('Todo')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  await app.listen(port);
  console.log(`🚀 Бэкенд запущен на ${backendUrl}:${port}`);
}
void bootstrap().then();
