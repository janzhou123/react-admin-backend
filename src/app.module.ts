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
  ],
  controllers: [CoffeeController, DictController, MenuController],
  providers: [],
})
export class AppModule {}
