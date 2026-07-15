import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.prismaService.products.findMany();
  }

  findOne(id: number) {
    return this.prismaService.products.findUnique({ where: { id } });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
