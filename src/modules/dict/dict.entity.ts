import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base/Base.entity';

@Entity('dict')
export class Dict extends BaseEntity {
  @ApiProperty({
    type: String,
    description: '父主键',
  })
  @Column({ name: 'parent_id', default: 0, comment: '父主键', length: 50 })
  parentId: string;

  @ApiProperty({
    type: String,
    description: '字典码',
  })
  @Column({ name: 'code', length: 50, nullable: true, comment: '字典码' })
  code: string;

  @ApiProperty({
    type: String,
    description: '字典值',
  })
  @Column({ name: 'dict_key', length: 50, nullable: true, comment: '字典值' })
  dictKey: string;

  @ApiProperty({
    type: String,
    description: '字典名称',
  })
  @Column({
    name: 'dict_value',
    length: 50,
    nullable: true,
    comment: '字典名称',
  })
  dictValue: string;

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
