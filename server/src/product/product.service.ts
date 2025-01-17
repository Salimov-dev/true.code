import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '@prisma/prisma.service';

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
}
