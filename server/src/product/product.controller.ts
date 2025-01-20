import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard, Public } from '@auth/guards/jwt-auth.guard';
import { PrismaService } from '@prisma/prisma.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly prismaService: PrismaService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    const userId = req.user['userId'];

    return this.productService.create(createProductDto, userId);
  }

  @Public()
  @Get('find-all')
  findAll() {
    return this.productService.findAll();
  }

  @Get('find-by-name/:name')
  findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  @Get('find-by-id/:id')
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Public()
  @Get('find-with-filters')
  async findWithFilters(
    @Query('page') page = '1',
    @Query('limit') limit = '8',
    @Query('sort') sort = 'createdAt',
    @Query('order') order = 'desc',
    @Query('filters') filters: string
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const parsedFilters = filters ? JSON.parse(filters) : {};

    return await this.productService.findWithFilters({
      page: pageNumber,
      limit: limitNumber,
      sort,
      order: order as 'asc' | 'desc',
      filters: parsedFilters,
    });
  }

  @Post('generate-random-products')
  async generateRandomProducts(@Req() req: Request) {
    const userId = req.user['userId'];
    const { limit } = req.body;

    const productQuantity = 50;

    const products = await this.productService.generateRandomProducts(
      userId,
      productQuantity
    );

    const successesProductQuantity =
      await this.prismaService.product.createMany({
        data: products,
        skipDuplicates: true,
      });

    const newTotalQuantity = await this.prismaService.product.count({
      where: { userId: userId },
    });

    const userProducts = await this.prismaService.product.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      take: productQuantity,
    });

    const startIndex = userProducts.length - successesProductQuantity.count;

    const createdProducts = userProducts.slice(startIndex, limit);

    return {
      newTotalQuantity,
      count: successesProductQuantity.count,
      createdProducts,
    };
  }
}
