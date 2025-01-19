import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '@prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { IProductFindWithFilters } from './interfaces/interfaces';
import { faker } from '@faker-js/faker';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto, userId: string) {
    const existingProductByProductName = await this.findByName(
      createProductDto.name
    );

    if (existingProductByProductName) {
      const message = 'Товар с таким именем уже существует';
      this.logger.error(message);
      throw new ConflictException(message);
    }

    const newProduct = this.prismaService.product
      .create({
        data: { ...createProductDto, userId },
      })
      .catch((err) => {
        const message = 'Ошибка при создании нового товара';
        this.logger.error(message, err);
        throw new BadRequestException(message);
      });

    return newProduct;
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  async findByName(name: string) {
    return this.prismaService.product
      .findUnique({
        where: { name },
      })
      .then((foundedProduct) => {
        if (!foundedProduct) {
          return null;
        }

        return foundedProduct;
      })
      .catch((err) => {
        this.logger.error('Ошибка при поиске товара по имени', err);
        throw new NotFoundException('Товар по имени не найден');
      });
  }

  async findById(id: string) {
    return this.prismaService.product
      .findUnique({
        where: { id },
      })
      .then((foundedProduct) => {
        if (!foundedProduct) {
          return null;
        }

        return foundedProduct;
      })
      .catch((err) => {
        this.logger.error('Ошибка при поиске товара по ID', err);
        throw new NotFoundException('Товар по ID не найден');
      });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.product
      .delete({
        where: { id },
      })
      .then((deletedProduct) => {
        return { message: 'Товар успешно удален', deletedProduct };
      })
      .catch((err) => {
        throw new Error(`Ошибка при удалении товара ${err.message}`);
      });
  }

  async findWithFilters(
    params: IProductFindWithFilters
  ): Promise<{ products: Product[]; total: number }> {
    const { page, limit, sort, order, filters } = params;

    const whereFilters: Prisma.ProductWhereInput = {};

    if (filters.name) {
      whereFilters.name = {
        contains: String(filters.name),
        mode: 'insensitive',
      };
    }

    const products = await this.prismaService.product.findMany({
      where: whereFilters,
      orderBy: {
        [sort]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.prismaService.product.count({
      where: whereFilters,
    });

    return { products, total };
  }

  async generateRandomProducts(
    userId: string,
    productQuantity: number
  ): Promise<Prisma.ProductCreateManyInput[]> {
    const products: Prisma.ProductCreateManyInput[] = [];

    for (let i = 0; i < productQuantity; i++) {
      const product: Prisma.ProductCreateManyInput = {
        id: v4(),
        name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
        description: faker.commerce.productDescription(),
        price: parseFloat(
          faker.commerce.price({ min: 10000, max: 50000, dec: 2 })
        ),
        discountPrice: parseFloat(
          faker.commerce.price({ min: 5000, max: 20000, dec: 2 })
        ),
        sku: v4().slice(0, 8),
        images: [],
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      products.push(product);
    }

    return products;
  }
}
