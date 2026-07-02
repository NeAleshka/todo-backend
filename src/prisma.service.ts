import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.$queryRaw`SELECT 1 as connected`;
      console.log('✅ Подключение к базе данных установлено');
    } catch (error) {
      console.error('❌ Подключение к базе данных НЕ установлено', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Подключение к базе данных закрыто');
  }
}
