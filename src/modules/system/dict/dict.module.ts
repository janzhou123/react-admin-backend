import { Module } from '@nestjs/common';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';
import { Dict } from './Dict.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [DictService],
  controllers: [DictController],
  imports: [TypeOrmModule.forFeature([Dict])],
  exports: [DictService],
})
export class DictModule {}
