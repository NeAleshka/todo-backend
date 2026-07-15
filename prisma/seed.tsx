import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString:
    'postgresql://postgres:123456@localhost:5432/todo_db?schema=public',
});
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Начинаем сидирование базы данных...');

  // Читаем JSON файл
  const jsonPath = path.join(__dirname, 'products.json');
  const rawData = fs.readFileSync(jsonPath, 'utf-8');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const products = JSON.parse(rawData);

  console.log(`📦 Найдено товаров: ${products.length}`);

  // Очищаем таблицу перед вставкой (опционально)
  await prisma.products.deleteMany();
  console.log('🗑️ Таблица очищена');

  // Вставляем данные
  const result = await prisma.products.createMany({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: products,
    skipDuplicates: true, // Пропускаем дубликаты если есть
  });

  console.log(`✅ Успешно добавлено товаров: ${result.count}`);
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при сидировании:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
