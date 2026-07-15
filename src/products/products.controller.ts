import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductDto } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({
    summary: 'Получение товаров',
    operationId: 'getAllProducts',
    description: 'Получение всех товаров',
  })
  @ApiOkResponse({
    description: 'Все товары получены',
    type: ProductDto,
    isArray: true,
    example: [
      {
        id: 1,
        name: 'Ноутбук Pro',
        description: 'Мощный ноутбук для работы и развлечений',
        price: '29990',
        image: 'https://img.freepik.com/premium-photo/',
      },
    ],
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка получения ',
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
  })
  @Get('/getAll')
  async findAll() {
    const data = await this.productsService.findAll();

    return { data };
  }

  @ApiOperation({
    summary: 'Получение товара',
    operationId: 'getProduct',
    description: 'Получение товара',
  })
  @ApiOkResponse({
    description: 'Товар получен',
    type: ProductDto,
    example: {
      id: 1,
      name: 'Ноутбук Pro',
      description: 'Мощный ноутбук для работы и развлечений',
      price: '29990',
      image: 'https://img.freepik.com/premium-photo/',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка получения',
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
