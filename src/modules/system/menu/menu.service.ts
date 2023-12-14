import { Injectable, Logger } from '@nestjs/common';
import { Menu } from './menu.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuListDto } from './dtos/menuList.dto';

@Injectable()
export class MenuService extends TypeOrmCrudService<Menu> {
  private readonly logger = new Logger(MenuService.name);
  constructor(@InjectRepository(Menu) repo: Repository<Menu>) {
    super(repo);
  }

  async getAllList() {
    const menulist = await this.repo.find();
    const firstMenus = menulist.filter((item) => item.parentId === '0');
    const secondMenus = menulist.filter((item) => item.parentId !== '0');
    const returnList = [];
    firstMenus.map((item) => {
      const data = new MenuListDto();
      data.icon = item.icon;
      data.path = item.path;
      data.title = item.title;
      data.sort = item.sort;
      data.children = [];
      const children = secondMenus.filter((row) => row.parentId === item.id);

      if (children) {
        children.map((item) => {
          const childrenData = new MenuListDto();
          childrenData.icon = item.icon;
          childrenData.path = item.path;
          childrenData.title = item.title;
          // this.logger.log('>>>>>>>>>>>>>>data=' + JSON.stringify(data));
          data.children.push(childrenData);
        });
        data.children.sort((a, b) => a.sort - b.sort);
      }
      returnList.push(data);
    });
    // 做排序返回
    return returnList.sort((a, b) => a.sort - b.sort);
  }
}
