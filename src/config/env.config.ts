import { validateSync } from 'class-validator';
import { EnvConfig } from './env.interface';
import { plainToInstance } from 'class-transformer';

export function validateEnv(config: Record<string, unknown>): EnvConfig {
  // 1. Превращаем объект в экземпляр класса EnvConfig
  const validatedConfig = plainToInstance(EnvConfig, config, {
    enableImplicitConversion: true,
  });

  // 2. Запускаем валидацию
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`Ошибка валидации .env: ${errors.toString()}`);
  }

  return validatedConfig;
}
