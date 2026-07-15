import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 1, description: 'ID товара' })
  id: number;

  @ApiProperty({
    example: 'Смартфон XYZ',
    description: 'Имя товара',
  })
  name: string;

  @ApiProperty({
    example: 'Современный смартфон с отличной камерой и быстрым процессором',
    description: 'Описание товара',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: '29990',
    description: 'Цена',
  })
  price?: string;

  @ApiProperty({
    example: 'https://img.freepik.com/p',
    description: 'Фото товара',
    required: false,
  })
  image?: string;
}

export class ProductsResponseDto {
  @ApiProperty({ type: [ProductDto] })
  data: ProductDto[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}
