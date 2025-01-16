import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { PrismaService } from '@prisma/prisma.service';
import { UserModule } from '@user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleAsyncOptions } from '@config/jwt-module.config';

@Module({
  controllers: [TokenController],
  providers: [TokenService, PrismaService],
  exports: [TokenService],
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions()),
  ],
})
export class TokenModule {}
