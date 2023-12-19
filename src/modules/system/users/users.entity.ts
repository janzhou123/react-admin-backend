import { Entity, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from 'src/common/base/MyBase.entity';

@Entity()
export class User extends MyBaseEntity {
  @ApiProperty({
    type: String,
    description: '用户账号',
  })
  @Column({ name: 'account', comment: '用户账号', length: 50 })
  account: string;

  @ApiProperty({
    type: String,
    description: '用户密码',
  })
  @Column({ name: 'password', comment: '用户密码', length: 255 })
  password: string;

  @ApiProperty({
    type: String,
    description: '用户昵称',
  })
  @Column({ name: 'name', comment: '用户昵称', nullable: true, length: 255 })
  name: string;

  @ApiProperty({
    type: String,
    description: '真名',
  })
  @Column({ name: 'real_name', comment: '真名', nullable: true, length: 255 })
  realName: string;

  @ApiProperty({
    type: String,
    description: '盐',
  })
  @Column({ name: 'salt', comment: '盐', nullable: true, length: 255 })
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return hashedPassword === this.password;
  }
}
