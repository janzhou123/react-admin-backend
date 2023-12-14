import { Menu } from '../menu.entity';

export class MenuListDto extends Menu {
  //菜单子目录
  children?: any[];
}
