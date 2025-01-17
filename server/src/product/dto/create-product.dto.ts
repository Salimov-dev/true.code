import { DiscountPriceValidator } from '@auth/validators/discount-price-validator';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  Validate,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(2, 25, { message: 'Длина имени должна быть от 2 до 25 символов' })
  name: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @Length(10, 1000, {
    message: 'Длина описания должна быть от 10 до 1000 символов',
  })
  description: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Стоимость должна быть числом' })
  @Min(0.01, { message: 'Стоимость должна быть больше 0' })
  @Max(1000000, { message: 'Стоимость не должна превышать 1 000 000' })
  price: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Стоимость со скидкой должна быть числом' })
  @Min(0.01, { message: 'Стоимость со скидкой должна быть больше 0' })
  @Max(1000000, {
    message: 'Стоимость со скидкой не должна превышать 1 000 000',
  })
  @Validate(DiscountPriceValidator)
  discountPrice: number;

  @IsString({ message: 'Артикул должно быть строкой' })
  @Length(6, 20, {
    message: 'Длина артикула должна быть от 6 до 20 символов',
  })
  sku: string;

  @IsOptional()
  images?: string[];
}
