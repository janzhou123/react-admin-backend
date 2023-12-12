import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModule } from './modules/coffee/coffee.module';
import { CoffeeController } from './modules/coffee/coffee.controller';
import { LoggerModule } from 'nestjs-pino';
import {
  loggerOptions,
  typeOrmConfigAsync,
  configuration,
} from './configuration';
import { DictModule } from './modules/dict/dict.module';
import { DictController } from './modules/dict/dict.controller';

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
  ],
  controllers: [CoffeeController, DictController],
  providers: [],
})
export class AppModule {}
