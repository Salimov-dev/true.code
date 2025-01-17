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
} from '@nestjs/common';
import { Request } from 'express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    const userId = req.user['userId'];
    console.log('createProductDto', createProductDto);

    return this.productService.create(createProductDto, userId);
  }

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
}
