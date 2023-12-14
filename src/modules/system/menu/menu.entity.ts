import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from '../../../common/base/MyBase.entity';
@Entity('menu')
export class Menu extends MyBaseEntity {
  @ApiProperty({
    type: String,
    description: '菜单标记',
  })
  @Column({ name: 'icon', comment: '菜单标记', nullable: true, length: 200 })
  icon: string;
  @ApiProperty({
    type: String,
    description: '菜单名称',
  })
  @Column({ name: 'title', comment: '菜单名称', length: 200 })
  title: string;
  @ApiProperty({
    type: String,
    description: '菜单路径',
  })
  @Column({ name: 'path', comment: '菜单路径', length: 200 })
  path: string;
  @ApiProperty({
    type: String,
    description: '父主键',
  })
  @Column({ name: 'parent_id', default: 0, comment: '父主键', length: 50 })
  parentId: string;

  @ApiProperty({
    type: Number,
    description: '排序',
  })
  @Column({
    name: 'sort',
    width: 5,
    nullable: true,
    comment: '排序',
  })
  sort: number;
}
