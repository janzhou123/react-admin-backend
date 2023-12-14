import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Menu } from './menu.entity';
import { MenuService } from './menu.service';

@Crud({
  model: {
    type: Menu,
  },
})
@ApiTags('menu 系统菜单')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('menu')
export class MenuController implements CrudController<Menu> {
  constructor(public service: MenuService) {}

  @ApiOperation({
    summary: '获取所有菜单',
    description: '获取所有菜单并嵌套返回',
  })
  @Get('/list')
  getAllMenuList() {
    return this.service.getAllList();
  }
}
