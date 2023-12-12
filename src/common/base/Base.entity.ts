import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '主键' })
  id: string;

  @Column({
    name: 'updated_by',
    length: 50,
    nullable: true,
    comment: '更新人ID',
  })
  updatedBy: string;

  @UpdateDateColumn({
    name: 'updated_time',
    type: 'datetime',
    comment: '更新时间',
  })
  updatedTime: Date;

  @Column({
    name: 'create_by',
    length: 50,
    nullable: true,
    comment: '创建人ID',
  })
  createdBy: string;

  @CreateDateColumn({
    name: 'created_time',
    type: 'datetime',
    comment: '创建时间',
  })
  createdTime: Date;

  @DeleteDateColumn({
    name: 'deleted_time',
    type: 'datetime',
    comment: '删除时间',
  })
  deletedTime: Date;
}
