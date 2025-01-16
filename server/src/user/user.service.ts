import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = this.hashPassword(createUserDto.password);

    const userData = { ...createUserDto, password: hashedPassword };

    const existingUserByUsername = await this.findByUsername(
      createUserDto.userName
    );
    if (existingUserByUsername) {
      const message = 'Пользователь с таким псевдонимом уже существует';
      this.logger.error(message);
      throw new ConflictException(message);
    }

    const existingUserByEmail = await this.findByEmail(createUserDto.email);
    if (existingUserByEmail) {
      const message = 'Пользователь с таким email уже существует';
      this.logger.error(message);
      throw new ConflictException(message);
    }

    const existingUserByPhone = await this.findByPhone(createUserDto.phone);
    if (existingUserByPhone) {
      const message = 'Пользователь с таким телефоном уже существует';
      this.logger.error(message);
      throw new ConflictException(message);
    }

    const newUser = await this.prismaService.user
      .create({
        data: userData,
      })
      .catch((err) => {
        this.logger.error('Ошибка при создании нового пользователя', err);
        throw new BadRequestException(
          'Ошибка при создании нового пользователя'
        );
      });
    delete newUser.password;

    return newUser;
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findById(id: string) {
    return this.prismaService.user
      .findUnique({
        where: { id },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        return foundedUser;
      })
      .catch((err) => {
        this.logger.error('Ошибка при поиске пользователя по ID', err);
        throw new NotFoundException('Пользователь по ID не найден');
      });
  }

  async findByUsername(userName: string) {
    return this.prismaService.user
      .findUnique({
        where: { userName },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        return foundedUser;
      })
      .catch((err) => {
        this.logger.error('Ошибка при поиске пользователя по псевдониму', err);
        throw new NotFoundException('Пользователь по псевдониму не найден');
      });
  }

  async findByEmail(email: string) {
    return this.prismaService.user
      .findUnique({
        where: { email },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        return foundedUser;
      })
      .catch((err) => {
        this.logger.error('Ошибка при поиске пользователя по почте', err);
        throw new NotFoundException('Пользователь по email не найден');
      });
  }

  async findByPhone(phone: string) {
    return this.prismaService.user
      .findUnique({
        where: { phone },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        return foundedUser;
      })
      .catch((err) => {
        this.logger.error(
          'Ошибка при поиске пользователя по номеру телефона',
          err
        );
        throw new NotFoundException(
          'Пользователь по номеру телефона не найден'
        );
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.user
      .delete({
        where: { id },
      })
      .then((deletedUser) => {
        return { message: 'Пользователь успешно удален', deletedUser };
      })
      .catch((err) => {
        throw new Error(`Ошибка при удалении пользователя ${err.message}`);
      });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
