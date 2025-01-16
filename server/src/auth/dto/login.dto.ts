import { IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;

  @IsString({ message: 'Имя пользователя должно быть строкой' })
  userName: string;
}
