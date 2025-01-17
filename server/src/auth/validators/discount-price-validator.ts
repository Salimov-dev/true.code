import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

export class DiscountPriceValidator implements ValidatorConstraintInterface {
  validate(
    discountPrice: number,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    const { price } = validationArguments.object as CreateProductDto;
    return discountPrice < price;
  }

  defaultMessage(): string {
    return 'Стоимость со скидкой не может быть выше начальной стоимости';
  }
}
