import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu } from './menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MenuService],
  controllers: [MenuController],
  imports: [TypeOrmModule.forFeature([Menu])],
  exports: [MenuService],
})
export class MenuModule {}
