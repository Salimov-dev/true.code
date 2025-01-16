import { CreateUserDto } from '@user/dto/create-user.dto';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  validate(repeatPassword: string, args: ValidationArguments) {
    const { password } = args.object as CreateUserDto;
    return password === repeatPassword;
  }

  defaultMessage(): string {
    return 'Введенные пароли не совпадают';
  }
}
