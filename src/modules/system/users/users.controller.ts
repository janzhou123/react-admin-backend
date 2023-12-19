import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './users.entity';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User,
  },
})
@ApiTags('users 用户表')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
