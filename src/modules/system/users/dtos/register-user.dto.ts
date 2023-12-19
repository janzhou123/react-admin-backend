import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    type: String,
    description: '用户账号',
  })
  account: string;
  @ApiProperty({
    type: String,
    description: '用户密码',
  })
  password: string;
}
