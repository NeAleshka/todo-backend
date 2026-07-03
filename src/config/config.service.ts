import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { EnvConfig } from './env.interface';

@Injectable()
export class ConfigEnvService extends NestConfigService {
  // ✅ Уточняем, что T — это только строковые ключи
  get<T extends Extract<keyof EnvConfig, string>>(key: T): EnvConfig[T] {
    return super.get(key) as EnvConfig[T];
  }
}
