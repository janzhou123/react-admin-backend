import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModule } from './modules/biz/coffee/coffee.module';
import { CoffeeController } from './modules/biz/coffee/coffee.controller';
import { LoggerModule } from 'nestjs-pino';
import {
  loggerOptions,
  typeOrmConfigAsync,
  configuration,
} from './configuration';
import { DictModule } from './modules/system/dict/dict.module';
import { DictController } from './modules/system/dict/dict.controller';
import { MenuController } from './modules/system/menu/menu.controller';
import { MenuModule } from './modules/system/menu/menu.module';
import { UsersModule } from './modules/system/users/users.module';
import { UsersController } from './modules/system/users/users.controller';
import { AuthController } from './modules/system/auth/auth.controller';
import { AuthModule } from './modules/system/auth/auth.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './modules/system/auth/guard/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    LoggerModule.forRoot(loggerOptions),
    CoffeeModule,
    DictModule,
    MenuModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [
    CoffeeController,
    DictController,
    MenuController,
    UsersController,
    AuthController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
